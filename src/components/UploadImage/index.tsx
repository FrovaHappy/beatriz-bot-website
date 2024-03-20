import { useState } from "react";
import { InputExport } from "@/types/types";
import useStatus from "./useStatusUpload";
import IconPencil from "@/app/icons/IconPencil";
import style from "./index.module.scss";
import IconTrash from "@/app/icons/IconTrash";

const TYPE_OF = "image/png, image/jpeg"

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
      <label htmlFor={style.file} className={style.withUrl__edit} typeof={TYPE_OF}>
        <IconPencil />
      </label>
      <button className={style.withUrl__delete}>
        <IconTrash />
      </button>
    </div>
  );
}

function EmptyUrl({ onChange }: Omit<WithUrlProps, 'url'>) {
  return (
    <>
      <input id={style.file} type="file" maxLength={1} onChange={onChange} />
      <label htmlFor={style.file} className={style.emptyUrl} typeof={TYPE_OF}>
        <IconPencil className={style.emptyUrl__icon}/>
        Haz click para agregar una imagen.
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
        switch (typeof url) {
          case "string":
            return <WithUrl url={url as string} onChange={onChange} />;
          default:
            return <EmptyUrl onChange={onChange}/>;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      })()}
    </div>
  );
  return [url, Component];
}
