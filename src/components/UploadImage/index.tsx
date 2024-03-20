import { useState } from "react";
import { InputExport } from "@/types/types";
import useStatus from "./useStatusUpload";
import IconPencil from "@/app/icons/IconPencil";
import style from "./index.module.scss";
import IconTrash from "@/app/icons/IconTrash";

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
    <div className={style.withUrl}>
      <img src={url} alt="image upload" className={style.withUrl__img}/>
      <input id={style.file} type="file" maxLength={1} onChange={onChange} />
      <label htmlFor={style.file} className={style.withUrl__edit}>
        <IconPencil />
      </label>
      <button className={style.withUrl__delete}>
        <IconTrash />
      </button>
    </div>
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
