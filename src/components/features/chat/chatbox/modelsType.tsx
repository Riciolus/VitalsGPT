import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useModelStore, { Model } from "@/store/useModelsStore";
import { useEffect } from "react";

const ModelsType = () => {
  const setModel = useModelStore((state) => state.setModel);
  const model = useModelStore((state) => state.model);

  useEffect(() => {
    const modelLocalStorage = localStorage.getItem("preferences-model") as Model | null;
    const validModels: Model[] = ["zephyr-7b-alpha", "mistral-small"];

    if (modelLocalStorage && validModels.includes(modelLocalStorage)) {
      setModel(modelLocalStorage);
    } else {
      localStorage.setItem("preferences-model", "zephyr-7b-alpha");
      setModel("zephyr-7b-alpha");
    }
  }, [setModel]);

  const changeModel = (modelName: Model) => {
    setModel(modelName);
    localStorage.setItem("preferences-model", modelName);
  };

  if (!model) {
    return null;
  }

  return (
    <div className=" flex gap-2 mt-1 ">
      <Button
        onClick={() => changeModel("zephyr-7b-alpha")}
        className={cn(
          "text-xs  p-1 rounded-md border text-yellow-600 dark:text-yellow-200",
          model === "zephyr-7b-alpha" && "bg-yellow-100 dark:bg-yellow-800/30"
        )}
      >
        zephyr-7b-alpha
      </Button>
      <Button
        onClick={() => changeModel("mistral-small")}
        className={cn(
          "text-xs  p-1 rounded-md border text-blue-600 dark:text-blue-200",
          model === "mistral-small" && "bg-blue-100 dark:bg-blue-900/30"
        )}
      >
        mistral-small
      </Button>
    </div>
  );
};

export default ModelsType;
