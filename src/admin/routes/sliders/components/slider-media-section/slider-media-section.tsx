import { PencilSquare } from "@medusajs/icons";
import {
  Button,
  Checkbox,
  CommandBar,
  Container,
  Heading,
  Text,
  clx,
  usePrompt,
} from "@medusajs/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ActionMenu } from "../../../../components/common/action-menu/action-menu";
import { Slider } from "../types";
import { useUpdateSlider } from "../../../../hooks/api/sliders";

type ProductMedisaSectionProps = {
  sliders: Slider[];
};

export const SliderMediaSection = ({ sliders }: ProductMedisaSectionProps) => {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const [selection, setSelection] = useState<Record<string, boolean>>({});

  const media = sliders;
  const handleCheckedChange = (id: string) => {
    setSelection((prev) => {
      if (prev[id]) {
        const { [id]: _, ...rest } = prev;
        return rest;
      } else {
        return { ...prev, [id]: true };
      }
    });
  };

  const { mutateAsync } = useUpdateSlider();

  const handleDelete = async () => {
    const ids = Object.keys(selection);

    const res = await prompt({
      title: t("general.areYouSure"),
      description: t("products.media.deleteWarning", {
        count: ids.length,
      }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel"),
    });

    if (!res) {
      return;
    }

    const mediaToKeep = sliders
      .filter((i) => !ids.includes(i.id))
      .map((i) => ({ url: i.url, rank: i.rank, handle: i.handle }));

    await mutateAsync(mediaToKeep, {
      onSuccess: () => {
        setSelection({});
      },
    });
  };

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">{t("products.media.label")}</Heading>
        <ActionMenu
          groups={[
            {
              actions: [
                {
                  label: t("actions.edit"),
                  to: "media?view=edit",
                  icon: <PencilSquare />,
                },
              ],
            },
          ]}
        />
      </div>
      {media.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-4 px-6 py-4">
          {media.map((i, index) => {
            const isSelected = selection[i.id];

            return (
              <div
                className="shadow-elevation-card-rest hover:shadow-elevation-card-hover transition-fg group relative aspect-square size-full cursor-pointer overflow-hidden rounded-[8px]"
                key={i.id}
              >
                <div
                  className={clx(
                    "transition-fg invisible absolute right-2 top-2 opacity-0 group-hover:visible group-hover:opacity-100",
                    {
                      "visible opacity-100": isSelected,
                    }
                  )}
                >
                  <Checkbox
                    checked={selection[i.id] || false}
                    onCheckedChange={() => handleCheckedChange(i.id)}
                  />
                </div>

                <Link to={`media`} state={{ curr: index }}>
                  <img
                    src={i.url}
                    alt={`${i.handle} image`}
                    className="size-full object-cover"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-y-4 pb-8 pt-6">
          <div className="flex flex-col items-center">
            <Text
              size="small"
              leading="compact"
              weight="plus"
              className="text-ui-fg-subtle"
            >
              {t("products.media.emptyState.header")}
            </Text>
            <Text size="small" className="text-ui-fg-muted">
              {t("products.media.emptyState.description")}
            </Text>
          </div>
          <Button size="small" variant="secondary" asChild>
            <Link to="media?view=edit">
              {t("products.media.emptyState.action")}
            </Link>
          </Button>
        </div>
      )}
      <CommandBar open={!!Object.keys(selection).length}>
        <CommandBar.Bar>
          <CommandBar.Value>
            {t("general.countSelected", {
              count: Object.keys(selection).length,
            })}
          </CommandBar.Value>
          <CommandBar.Seperator />
          <CommandBar.Command
            action={handleDelete}
            label={t("actions.delete")}
            shortcut="d"
          />
        </CommandBar.Bar>
      </CommandBar>
    </Container>
  );
};
