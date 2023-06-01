import { Container, Typography } from "@mui/material";
import ThreeColumnLayout from "../ThreeColumnLayout";
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
function createData(area, heating, cooling) {
  return { area, heating, cooling };
}

const rows = [
  createData(10, "3000 - 5000", "6000 - 9000"),
  createData(20, "6000 - 10000", "12000 - 18000"),
  createData(30, "9000 - 15000", "18000 - 27000"),
  createData(50, "15000 - 25000", "30000 - 45000"),
  createData(100, "30000 - 50000", "60000 - 90000"),
];

export default function BtuToM2() {
  const { t } = useTranslation("");

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("btuToM2.title")}
      </Typography>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontSize: "1rem", whiteSpace: "pre-wrap" }}
      >
        {t("btuToM2.description")}
      </Typography>
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>{t("btuToM2.area")}</StyledTableCell>
                  <StyledTableCell align="right">
                    {t("btuToM2.heating")}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {t("btuToM2.cooling")}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.area}>
                    <StyledTableCell component="th" scope="row">
                      {row.area}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.heating}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.cooling}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Container>
    </ThreeColumnLayout>
  );
}
