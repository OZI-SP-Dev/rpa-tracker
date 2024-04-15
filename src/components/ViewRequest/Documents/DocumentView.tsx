import { Icon } from "@fluentui/react";
import {
  Button,
  Caption1,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Link,
  Spinner,
  Title3,
  Tooltip,
} from "@fluentui/react-components";
import { getFileTypeIconProps } from "@fluentui/react-file-type-icons";
import { DeleteIcon } from "@fluentui/react-icons-mdl2";
import { SPDocument, useDeleteDocument } from "api/documentsApi";

declare const _spPageContextInfo: {
  webAbsoluteUrl: string;
  aadUserId: string;
  userEmail: string;
  siteId: string;
};

export const DocumentView = (props: {
  document: SPDocument;
  readonly?: boolean;
}) => {
  const deleteDocument = useDeleteDocument(props.document);

  const extension = props.document.ServerRelativeUrl.substring(
    props.document.ServerRelativeUrl.lastIndexOf(".") + 1
  );

  const lastModified = new Date(
    props.document.TimeLastModified
  ).toLocaleString();

  const isOfficeOrPdfFile: boolean = wordExtensions
    .concat(excelExtensions)
    .concat(ppExtensions)
    .concat(["pdf"])
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
  } else if (extension === "pdf") {
    downloadUrl = "odopen://openFile/";
    downloadUrl += "?fileId=" + props.document.UniqueId;
    downloadUrl += "&siteId=" + _spPageContextInfo.siteId;
    downloadUrl += "&listId=" + props.document.ListId;
    downloadUrl += "&userEmail=" + _spPageContextInfo.userEmail;
    downloadUrl += "&userId=" + _spPageContextInfo.aadUserId;
    downloadUrl += "&webUrl=" + _spPageContextInfo.webAbsoluteUrl;
    downloadUrl += "&fileName=" + props.document.Name;
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
          <Link download={!isOfficeOrPdfFile} href={encodeURI(downloadUrl)}>
            <Title3 className="document-name">{props.document.Name}</Title3>
          </Link>
        }
        description={
          <Caption1>
            Last Updated By: {props.document.ModifiedBy.Title}
            <br />
            Last Updated On: {lastModified}
          </Caption1>
        }
        action={
          <Dialog modalType="alert">
            <DialogTrigger disableButtonEnhancement>
              <Tooltip withArrow content="Delete" relationship="label">
                <Button
                  appearance="transparent"
                  icon={deleteDocument.isLoading ? <Spinner /> : <DeleteIcon />}
                  aria-label="Delete"
                  disabled={deleteDocument.isLoading}
                />
              </Tooltip>
            </DialogTrigger>
            <DialogSurface>
              <DialogBody>
                <DialogTitle>Delete document</DialogTitle>
                <DialogContent>
                  Are you sure you wish to delete this document?
                  <br />
                  {props.document.Name}
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary">Cancel</Button>
                  </DialogTrigger>
                  <DialogTrigger disableButtonEnhancement>
                    <Button
                      appearance="primary"
                      onClick={() => deleteDocument.mutate()}
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </DialogSurface>
          </Dialog>
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
