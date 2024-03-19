import { useState } from "react";
import { InputExport } from "@/types/types";
import useStatus from "./useStatusUpload";
import IconPencil from "@/app/icons/IconPencil";
import style from "./index.module.scss";

/* eslint-disable @next/next/no-img-element */
type Url = string | null | undefined;
interface Props {
  defaultValue: Url;
}
interface WithUrlProps {
  url: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function WithUrl({ url, onChange }: WithUrlProps) {
  return (
    <>
      <img src={url} alt="image upload" />
      <input id={style.fichero} type="file" maxLength={1} onChange={onChange} />
      <label htmlFor={style.fichero} className={style.circle}>
        <IconPencil />
      </label>
    </>
  );
}
export default function UploadImage({ defaultValue }: Props): InputExport<Url> {
  const [url, setUrl] = useState(defaultValue);
  const [file, setFile] = useState<File | null>(null);
  const status = useStatus(setUrl, file);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    console.log(files);
    if (!files) {
      setUrl(null);
      return;
    }
    setFile(files[0]);
  };
  if (status === "uploading") {
    const Component = <>loading</>;
    return [url, Component];
  }
  if (status === "error") {
    const Component = <>has ocurred an error </>;
    return [url, Component];
  }
  const Component = (
    <div>
      {(() => {
        switch (typeof defaultValue) {
          case "string":
            return <WithUrl url={url as string} onChange={onChange} />;
          default:
            return <div>vació</div>;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      })()}
    </div>
  );
  return [url, Component];
}
