import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import {
  Box,
  Divider,
  Icon,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import {
  InternationalLinks,
  InternationalLinksConvertors,
  InternationalLinksGenerators,
  InternationalLinksOthers,
} from "../constants";

const groups = [
  {
    label: "common.calculators",
    icon: "calculate",
    items: InternationalLinks,
  },
  {
    label: "common.converters",
    icon: "swap_horiz",
    items: InternationalLinksConvertors,
  },
  {
    label: "common.generators",
    icon: "auto_awesome",
    items: InternationalLinksGenerators,
  },
  {
    label: "common.others",
    icon: "handyman",
    items: InternationalLinksOthers,
  },
];

export default function BurgerMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeGroup, setActiveGroup] = useState(null);
  const { locale = "en" } = useRouter();
  const { t } = useTranslation();
  const open = Boolean(anchorEl);

  const close = () => {
    setAnchorEl(null);
    setActiveGroup(null);
  };

  return (
    <>
      <IconButton
        id="tools-menu-button"
        aria-controls={open ? "tools-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Browse all tools"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        sx={{ color: "text.primary" }}
      >
        <Icon>menu</Icon>
      </IconButton>
      <Menu
        id="tools-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={close}
        MenuListProps={{ "aria-labelledby": "tools-menu-button" }}
        PaperProps={{
          sx: {
            mt: 1,
            width: { xs: "calc(100vw - 24px)", sm: 390 },
            maxHeight: "min(680px, calc(100vh - 96px))",
            border: "1px solid",
            borderColor: "divider",
            boxShadow: "0 20px 60px rgba(23,32,51,.16)",
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="overline" color="text.secondary">
            Explore WannaCalc
          </Typography>
          <Typography variant="h3" sx={{ fontSize: "1.1rem" }}>
            Choose a tool
          </Typography>
        </Box>
        <Divider />
        <List disablePadding>
          {groups.map((group, groupIndex) => (
            <Box key={group.label}>
              <ListItemButton
                onClick={() =>
                  setActiveGroup(activeGroup === groupIndex ? null : groupIndex)
                }
                aria-expanded={activeGroup === groupIndex}
                sx={{ py: 1.25 }}
              >
                <ListItemIcon sx={{ minWidth: 38, color: "primary.main" }}>
                  <Icon>{group.icon}</Icon>
                </ListItemIcon>
                <ListItemText
                  primary={t(group.label)}
                  secondary={`${group.items.length} tools`}
                  primaryTypographyProps={{ fontWeight: 700 }}
                />
                <Icon aria-hidden="true">
                  {activeGroup === groupIndex ? "expand_less" : "expand_more"}
                </Icon>
              </ListItemButton>
              {activeGroup === groupIndex && (
                <List
                  disablePadding
                  sx={{ bgcolor: "background.default", py: 0.5 }}
                >
                  {group.items.map((item) => (
                    <ListItemButton
                      key={item.en}
                      component={Link}
                      href={item[locale] || item.en}
                      onClick={close}
                      sx={{ pl: 7, py: 0.75 }}
                    >
                      <ListItemText
                        primary={t(item.title)}
                        primaryTypographyProps={{
                          variant: "body2",
                          fontWeight: 600,
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              )}
              {groupIndex < groups.length - 1 && <Divider />}
            </Box>
          ))}
        </List>
      </Menu>
    </>
  );
}
