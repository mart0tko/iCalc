import * as React from "react";
import Menu from "@mui/material/Menu";
import {
  Collapse,
  Icon,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import InternationalLinks, {
  InternationalLinksConvertors,
  InternationalLinksGenerators,
  InternationalLinksOthers,
} from "../constants";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BurgerMenu() {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [openCalculators, setOpenCalculators] = React.useState(false);
  const [openConverters, setOpenConverters] = React.useState(false);
  const [openGenerators, setOpenGenerators] = React.useState(false);

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={anchorEl ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? "true" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Icon
          sx={{
            color: "white",
          }}
        >
          menu
        </Icon>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={anchorEl}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <List sx={{ padding: 0, minWidth: 250 }}>
          <ListItemButton onClick={() => setOpenCalculators(!openCalculators)}>
            <ListItemText>{t("common.calculators")}</ListItemText>
            {openCalculators ? (
              <Icon
                sx={{
                  color: "black",
                }}
              >
                expand_less
              </Icon>
            ) : (
              <Icon
                sx={{
                  color: "black",
                }}
              >
                expand_more
              </Icon>
            )}
          </ListItemButton>
          <Collapse in={openCalculators} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {InternationalLinks.map((value) => (
                <Link
                  key={value.title}
                  href={value[locale]}
                  locale={locale}
                  onClick={() => setAnchorEl(null)}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText>{t(value.title)}</ListItemText>
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={() => setOpenConverters(!openConverters)}>
            <ListItemText>{t("common.converters")}</ListItemText>
            {openConverters ? (
              <Icon
                sx={{
                  color: "black",
                }}
              >
                expand_less
              </Icon>
            ) : (
              <Icon
                sx={{
                  color: "black",
                }}
              >
                expand_more
              </Icon>
            )}
          </ListItemButton>
          <Collapse in={openConverters} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {InternationalLinksConvertors.map((value) => (
                <Link
                  key={value.title}
                  href={value[locale]}
                  locale={locale}
                  onClick={() => setAnchorEl(null)}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText>{t(value.title)}</ListItemText>
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={() => setOpenGenerators(!openGenerators)}>
            <ListItemText>{t("common.generators")}</ListItemText>
            {openGenerators ? (
              <Icon
                sx={{
                  color: "black",
                }}
              >
                expand_less
              </Icon>
            ) : (
              <Icon
                sx={{
                  color: "black",
                }}
              >
                expand_more
              </Icon>
            )}
          </ListItemButton>
          <Collapse in={openGenerators} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {InternationalLinksGenerators.map((value) => (
                <Link
                  key={value.title}
                  href={value[locale]}
                  locale={locale}
                  onClick={() => setAnchorEl(null)}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText>{t(value.title)}</ListItemText>
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
          <Collapse in={openGenerators} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {InternationalLinksOthers.map((value) => (
                <Link
                  key={value.title}
                  href={value[locale]}
                  locale={locale}
                  onClick={() => setAnchorEl(null)}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText>{t(value.title)}</ListItemText>
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
        </List>
      </Menu>
    </div>
  );
}
