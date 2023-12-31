import { useState, useRef, useEffect, ChangeEvent } from "react";
import { useAppDispatch } from "@/shared/infra/redux/hooks";
import { supabase } from "@/shared/infra/supabase";
import { profileService } from "@/modules/sidebar/services";
import { getProfileAction } from "@/modules/sidebar/slices/profile";
import moment from "moment";

export const useCoverImage = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files?.[0]);
  };

  const handleCancelPreview = () => {
    setPreview("");
  };

  const handleUploadFile = async () => {
    if (selectedFile) {
      const now = Date.now();
      const { data, error } = await supabase.storage
        .from("cover-images")
        .upload(`${now}-${selectedFile?.name}`, selectedFile);
      if (data && !error) {
        await profileService.updateProfile({
          field: "coverImageUrl",
          data: `${now}-${selectedFile?.name}`,
        });
        await dispatch(getProfileAction());
        setPreview("");
      }
    }
  };

  return {
    preview,
    inputFileRef,
    handleSelectFile,
    handleCancelPreview,
    handleUploadFile,
  };
};
