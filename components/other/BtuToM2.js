import { Alert, Container, TextField, Typography } from "@mui/material";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Description from "../Description";
import Title from "../Title";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import {
  calculateAreaFromBtu,
  calculateBtuRequirement,
} from "../../lib/calculations";

// Styled components for table customization
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BtuToM2() {
  const theme = useTheme();
  const { asPath } = useRouter();
  const reversed = asPath.includes("/btu-to-m2");
  const { t } = useTranslation("");
  const [area, setArea] = useState(20);
  const [heatingBTU, setHeatingBTU] = useState("");
  const [coolingBTU, setCoolingBTU] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const numericArea = Number(area);
    if (!Number.isFinite(numericArea) || numericArea <= 0) {
      setHeatingBTU("");
      setCoolingBTU("");
      setError(area === "" ? "" : "Area must be greater than zero.");
      return;
    }
    setError("");
    const values = reversed
      ? calculateAreaFromBtu(numericArea)
      : calculateBtuRequirement(numericArea);
    setHeatingBTU(values.heating.toFixed(2));
    setCoolingBTU(values.cooling.toFixed(2));
  }, [area, reversed]);

  const handleAreaChange = (e) => {
    const inputArea = e.target.value;
    setArea(inputArea);
  };

  return (
    <ThreeColumnLayout>
      <Title>{t(reversed ? "btuToM2.titleReversed" : "btuToM2.title")}</Title>
      <Description>
        {reversed
          ? "Estimate the room area covered by a heating or cooling capacity."
          : t("btuToM2.description")}
        <br />
        {!reversed && t("btuToM2.descriptionExample")}
        <br />
        {t("btuToM2.descriptionNote")}
      </Description>
      <br />
      <Container
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: {
            xs: "column",
            sm: "column",
          },
        }}
      >
        <Container sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <TextField
            label={reversed ? "Capacity (BTU/h)" : t("btuToM2.area")}
            type="number"
            variant="outlined"
            value={area}
            onChange={handleAreaChange}
            inputProps={{ min: 0, step: "any" }}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </Container>
      </Container>
      {error && <Alert severity="error">{error}</Alert>}
      {heatingBTU !== "" && coolingBTU !== "" && (
        <Container
          sx={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: {
              xs: "column",
              sm: "column",
            },
          }}
        >
          <Container sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
              <Table sx={{ minWidth: 300 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>
                      {reversed ? "Capacity (BTU/h)" : t("btuToM2.area")}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {reversed ? "Heating area (m²)" : t("btuToM2.heating")}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {reversed ? "Cooling area (m²)" : t("btuToM2.cooling")}
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {area}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {heatingBTU ? heatingBTU : ""}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {coolingBTU ? coolingBTU : ""}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Container>
      )}
      <br />
      <Typography sx={{ fontSize: "0.75rem" }}>
        {t("percentage.related")}
        <Link
          href="/btu-to-m3-convertor"
          style={{ color: theme.palette.primary.main }}
        >
          {t("btuToM3Converter.title")}
        </Link>
        {", "}
        <Link
          href="/btu-to-kw-convertor"
          style={{ color: theme.palette.primary.main }}
        >
          {t("btuToKwConverter.title")}
        </Link>
      </Typography>
    </ThreeColumnLayout>
  );
}
