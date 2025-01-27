import { defineWidgetConfig } from "@medusajs/admin-sdk";
import {
  DetailWidgetProps,
  AdminCollection,
  HttpTypes,
} from "@medusajs/framework/types";
import { Container, Heading, Button, Toaster, toast } from "@medusajs/ui";
import { Trash } from "@medusajs/icons";
import { FileType, FileUpload } from "../components/common";
import { useCallback, useEffect, useState } from "react";
import { sdk } from "../lib/config";

const ProductCollectionWidget = ({
  data,
}: DetailWidgetProps<AdminCollection>) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (data.metadata?.image) {
      setImage(data.metadata.image as string);
    }
  }, [data.metadata?.image]);

  const onUpload = useCallback(async (files: FileType[]) => {
    if (files.length === 0) return;
    const firstFile = files[0];
    setImage(firstFile.url);

    const mappedFiles: HttpTypes.AdminUploadFile = {
      files: files.map((file) => file.file),
    };

    const { files: uploadedFiles } = await sdk.admin.upload.create(mappedFiles);

    await sdk.admin.productCollection.update(data.id, {
      metadata: {
        image: uploadedFiles[0].url,
      },
    });

    toast.success("Koleksiyon görseli başarıyla değiştirildi");
  }, []);

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Koleksiyon Görseli</Heading>
      </div>
      <div className="px-6 py-4">
        {!image && (
          <FileUpload
            label="Koleksiyon Görseli"
            hint="Koleksiyon görselini seçiniz"
            formats={["image/*"]}
            onUploaded={onUpload}
          />
        )}

        {image && (
          <div className="relative flex items-center justify-center w-64 h-64">
            <img
              src={image}
              alt="Koleksiyon Görseli"
              className="object-cover w-full h-full"
            />

            <Button
              className="absolute top-0 right-0"
              onClick={() => setImage(null)}
            >
              <Trash />
            </Button>
          </div>
        )}

        <Toaster />
      </div>
    </Container>
  );
};

// The widget's configurations
export const config = defineWidgetConfig({
  zone: "product_collection.details.after",
});

export default ProductCollectionWidget;
