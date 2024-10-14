import FileUpload from "../components/file_upload";
import FileList from "../components/files_list";

export default function Home() {
  return (
    <div className="grid grid-cols-2 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <FileList/>
      <FileUpload/>
    </div>
  );
}
