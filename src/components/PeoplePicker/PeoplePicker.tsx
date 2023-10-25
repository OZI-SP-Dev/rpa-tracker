import { FunctionComponent, useRef } from "react";
import { IPersonaProps } from "@fluentui/react/lib/Persona";
import { Person } from "api/requestsApi";
import {
  IBasePickerSuggestionsProps,
  ISuggestionItemProps,
  NormalPeoplePicker,
  PeoplePickerItemSuggestion,
} from "@fluentui/react/lib/Pickers";
import { spWebContext } from "api/SPWebContext";
import { IPeoplePickerEntity } from "@pnp/sp/profiles";
import { LayerHost } from "@fluentui/react";

// Custom Persona type so we can save Id and/or EMail with the item
interface CustomPersona extends IPersonaProps {
  Id: string;
  Title: string;
  EMail: string;
}

// TODO: Add a way to show as input needed/corrected

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: "Suggested People",
  mostRecentlyUsedHeaderText: "Suggested Contacts",
  noResultsFoundText: "No results found",
  loadingText: "Loading",
  showRemoveButtons: true,
  suggestionsAvailableAlertText: "People Picker Suggestions available",
  suggestionsContainerAriaLabel: "Suggested contacts",
};

interface IPeoplePickerProps {
  /** Required - The text used to label this people picker for screenreaders */
  ariaLabel: string;
  readOnly?: boolean;
  required?: boolean;
  /** Optional - Limit the People Picker to only allow selection of specific number -- Defaults to 1 */
  itemLimit?: number;
  updatePeople: (p: Person[]) => void;
  selectedItems: Person[] | Person;
}

export const PeoplePicker: FunctionComponent<IPeoplePickerProps> = (props) => {
  const picker = useRef(null);

  let selectedItems: CustomPersona[];
  if (Array.isArray(props.selectedItems)) {
    selectedItems = props.selectedItems.map((item) => ({
      ...item,
      text: item.Title,
    }));
  } else if (props.selectedItems) {
    selectedItems = [
      { ...props.selectedItems, text: props.selectedItems.Title },
    ];
  } else {
    selectedItems = [];
  }

  const onFilterChanged = async (
    filterText: string,
    currentPersonas?: IPersonaProps[],
    limitResults?: number
  ): Promise<IPersonaProps[]> => {
    if (filterText) {
      let filteredPersonas: IPersonaProps[];

      const results = await spWebContext.profiles.clientPeoplePickerSearchUser({
        AllowEmailAddresses: false,
        AllowMultipleEntities: false,
        MaximumEntitySuggestions: limitResults ?? 25,
        QueryString: filterText,
        PrincipalSource: 15, // PrincipalSource.All -- Cannot use the enum directly from PnPJS due to it being an ambient enum
        PrincipalType: 1, // PrincipalType.User -- Cannot use the enum directly from PnPJS due to it being an ambient enum
      });

      const newPersonas: IPersonaProps[] = [];
      results.forEach((person: IPeoplePickerEntity) => {
        const persona: CustomPersona = {
          Id: person.EntityData.SPUserID ?? "-1",
          Title: person.DisplayText,
          EMail: person.EntityData.Email ?? "",
          text: person.DisplayText,
          secondaryText: person.EntityData.Title,
        };
        newPersonas.push(persona);
      });

      filteredPersonas = [...newPersonas];

      // If people were already selected, then do not list them as possible additions
      if (currentPersonas && filteredPersonas) {
        filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
      }

      if (currentPersonas) {
        filteredPersonas = removeDuplicates(filteredPersonas, currentPersonas);
      }
      filteredPersonas = limitResults
        ? filteredPersonas.slice(0, limitResults)
        : filteredPersonas;
      return filteredPersonas;
    } else {
      return [];
    }
  };

  const onItemsChange = (items: IPersonaProps[] | undefined) => {
    if (items) {
      props.updatePeople(items as Person[]);
    } else {
      props.updatePeople([]);
    }
  };

  const onRenderSuggestionsItem = (
    personaProps: IPersonaProps,
    suggestionsProps: ISuggestionItemProps<IPersonaProps> | undefined
  ) => (
    <PeoplePickerItemSuggestion
      personaProps={personaProps}
      suggestionsProps={suggestionsProps}
      styles={{ personaWrapper: { width: "100%" } }}
    />
  );

  return (
    <>
      <NormalPeoplePicker
        pickerCalloutProps={{
          layerProps: {
            hostId: "myPicker",
          },
        }}
        onResolveSuggestions={onFilterChanged}
        getTextFromItem={getTextFromItem}
        onRenderSuggestionsItem={onRenderSuggestionsItem}
        pickerSuggestionsProps={suggestionProps}
        className={"ms-PeoplePicker"}
        key={"controlled"}
        selectionAriaLabel={"Selected users"}
        removeButtonAriaLabel={"Remove"}
        selectedItems={selectedItems}
        onChange={onItemsChange}
        inputProps={{
          "aria-label": props.ariaLabel,
        }}
        componentRef={picker}
        resolveDelay={300}
        disabled={props.readOnly}
        itemLimit={props.itemLimit ? props.itemLimit : 1}
      />
      {/* Creating a LayerHost and setting the z-index to 1 higher than it's default of 1000000
             allows the popup people suggestions to appear above the V9 Dialog box 
             This can likely be eliminated once they release a V9 for the PeoplePicker
             NOTE:  When removing also remove the pickerCalloutProps setting hostId to this host  */}
      <LayerHost
        id="myPicker"
        style={{ zIndex: 1000001, position: "fixed" }}
      ></LayerHost>
    </>
  );
};

function removeDuplicates(
  personas: IPersonaProps[],
  possibleDupes: IPersonaProps[]
) {
  return personas.filter(
    (persona) => !listContainsPersona(persona, possibleDupes)
  );
}

function listContainsPersona(
  persona: IPersonaProps,
  personas: IPersonaProps[]
) {
  if (!personas || !personas.length || personas.length === 0) {
    return false;
  }
  return personas.filter((item) => item.text === persona.text).length > 0;
}

function getTextFromItem(persona: IPersonaProps): string {
  return persona.text as string;
}
