import { Icon } from "@fluentui/react";
import {
  Button,
  Caption1,
  Card,
  CardHeader,
  Link,
  Text,
} from "@fluentui/react-components";
import { getFileTypeIconProps } from "@fluentui/react-file-type-icons";
import { DeleteIcon } from "@fluentui/react-icons-mdl2";
import { SPDocument, useDeleteDocument } from "api/documentsApi";

export const DocumentView = (props: {
  document: SPDocument;
  readonly?: boolean;
}) => {
  const deleteDocument = useDeleteDocument(props.document);

  const extension = props.document.ServerRelativeUrl.substring(
    props.document.ServerRelativeUrl.lastIndexOf(".") + 1
  );

  const isOfficeFile: boolean = wordExtensions
    .concat(excelExtensions)
    .concat(ppExtensions)
    .includes(extension);

  const viewEdit = props.readonly ? "v" : "e";

  //Application specific URI schemes
  let downloadUrl = props.document.ServerRelativeUrl;
  if (wordExtensions.includes(extension)) {
    downloadUrl = `ms-word:of${viewEdit}|u|${window.location.origin}${props.document.ServerRelativeUrl}`;
  } else if (excelExtensions.includes(extension)) {
    downloadUrl = `ms-excel:of${viewEdit}|u|${window.location.origin}${props.document.ServerRelativeUrl}`;
  } else if (ppExtensions.includes(extension)) {
    downloadUrl = `ms-powerpoint:of${viewEdit}|u|${window.location.origin}${props.document.ServerRelativeUrl}`;
  }

  return (
    <Card style={{ margin: "0.5em" }}>
      <CardHeader
        image={
          <Icon
            {...getFileTypeIconProps({
              extension: extension,
              size: 64,
              imageFileType: "png",
            })}
          />
        }
        header={
          <Link download={!isOfficeFile} href={downloadUrl}>
            <Text size={600} weight="semibold">
              {props.document.Name}
            </Text>
          </Link>
        }
        description={
          <Caption1>
            Last Updated By: {props.document.ModifiedBy.Title}
            <br />
            Last Updated On: {props.document.TimeLastModified}
          </Caption1>
        }
        action={
          <Button
            appearance="transparent"
            icon={<DeleteIcon />}
            aria-label="Delete"
            onClick={() => deleteDocument.mutate()}
            disabled={deleteDocument.isLoading}
          />
        }
      />
    </Card>
  );
};

const wordExtensions: string[] = [
  "doc",
  "dot",
  "wbk",
  "docx",
  "docm",
  "dotx",
  "dotm",
  "docb",
];
const excelExtensions: string[] = [
  "xls",
  "xlt",
  "xlm",
  "xlsx",
  "xlsm",
  "xltx",
  "xltm",
  "xlsb",
  "xla",
  "xlam",
  "xll",
  "xlw",
];
const ppExtensions: string[] = [
  "ppt",
  "pot",
  "pps",
  "pptx",
  "pptm",
  "potx",
  "potm",
  "ppam",
  "ppsx",
  "ppsm",
  "sldx",
  "sldm",
];
