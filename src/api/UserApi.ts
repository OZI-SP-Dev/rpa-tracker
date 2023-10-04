import { TestImages } from "@fluentui/example-data";

declare const _spPageContextInfo: {
  userId: number;
  userDisplayName: string;
  userEmail: string;
  userLoginName: string;
};

export interface IPerson {
  Id: number;
  Title: string;
  EMail: string;
  text?: string;
  secondaryText?: string;
  imageUrl?: string;
  imageInitials?: string;
}

/**
 * This class represents a User of this application.
 * It also supports interfacing with the PeoplePicker library.
 */
export class Person implements IPerson {
  Id: number;
  Title: string;
  EMail: string;
  text: string;
  secondaryText: string;
  imageUrl?: string;
  imageInitials?: string;

  constructor(
    person: IPerson = {
      Id: -1,
      Title: "",
      EMail: "",
    },
    LoginName?: string
  ) {
    this.Id = person.Id;
    this.Title = person.Title ? person.Title : person.text ? person.text : "";
    this.text = person.text ? person.text : this.Title;
    this.secondaryText = person.secondaryText ? person.secondaryText : "";
    this.EMail = person.EMail;
    if (person.imageUrl) {
      this.imageUrl = person.imageUrl;
    } else if (LoginName) {
      this.imageUrl =
        "/_layouts/15/userphoto.aspx?accountname=" + LoginName + "&size=S";
    }
    if (!this.imageUrl) {
      this.imageInitials =
        this.Title.substring(
          this.Title.indexOf(" ") + 1,
          this.Title.indexOf(" ") + 2
        ) + this.Title.substring(0, 1);
    }
  }
}

export const useCurrentUser = () => {
  let currentUser;
  if (import.meta.env.DEV) {
    currentUser = new Person({
      Id: 1,
      Title: "Barb Akew",
      EMail: "Barb Akew@localhost",
      imageUrl: TestImages.personaFemale,
    });
  } else {
    currentUser = new Person(
      {
        Id: _spPageContextInfo.userId,
        Title: _spPageContextInfo.userDisplayName,
        EMail: _spPageContextInfo.userEmail,
      },
      _spPageContextInfo.userLoginName
    );
  }

  return currentUser;
};
