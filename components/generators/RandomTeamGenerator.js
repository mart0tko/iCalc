import {
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControlLabel,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ThreeColumnLayout from "../ThreeColumnLayout";
import { useTranslation } from "next-i18next";
import CopyToClipboardButton from "../CopyToClipboardButton";
import CalcButtons from "../CalcButtons";
import Input from "../Input";

const teamNumberOptions = [
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
];

function generateRandomTeam(players, numberOfTeams) {
  const shuffledPlayers = players.sort(() => Math.random() - 0.5);

  const teams = [];
  const playersPerTeam = Math.floor(shuffledPlayers.length / numberOfTeams);
  let remainingPlayers = shuffledPlayers.length % numberOfTeams;
  let playerIndex = 0;

  for (let i = 0; i < numberOfTeams; i++) {
    let teamPlayers = playersPerTeam;

    if (remainingPlayers > 0) {
      teamPlayers++;
      remainingPlayers++;
    }

    const team = shuffledPlayers.slice(playerIndex, playerIndex + teamPlayers);
    teams.push(team);

    playerIndex += teamPlayers;
  }

  return teams;
}

export default function RandomTeamGenerator() {
  const { t } = useTranslation("");
  const [inputValue, setInputValue] = useState("");
  const [numberOfTeams, setNumberOfTeams] = useState(2);
  const [team, setTeam] = useState(["John", "Martin", "Emma"]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    setResult(generateRandomTeam(team, numberOfTeams));
  }, []);

  const handleClear = () => {
    inputValue && setInputValue("");
    setNumberOfTeams(2);
    setTeam(["John", "Martin", "Emma"]);
    result && setResult([]);
  };

  return (
    <ThreeColumnLayout>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ fontSize: "2rem", lineHeight: "3rem" }}
      >
        {t("randomTeamGenerator.title")}
      </Typography>
      <Typography variant="h3" gutterBottom sx={{ fontSize: "1rem" }}>
        {t("randomTeamGenerator.description")}
      </Typography>
      <br />
      <Container
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
        }}
      >
        <Container sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Input
            type="text"
            label={t("randomTeamGenerator.enterTeamMemberName")}
            variant="standard"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => {
              if (!inputValue) {
                return;
              }
              setTeam([inputValue, ...team]);
              setInputValue("");
            }}
            sx={{ margin: "1rem" }}
          >
            {t("randomTeamGenerator.addTeamMember")}
          </Button>
          {team && team.length ? (
            <Stack
              direction="row"
              spacing={2}
              sx={{ display: "flex", flexWrap: "wrap" }}
              divider={<Divider orientation="vertical" flexItem />}
            >
              {team.map((element, index) => (
                <Chip
                  key={element}
                  label={element}
                  onDelete={() => setTeam(team.filter((i) => i !== element))}
                />
              ))}
            </Stack>
          ) : null}
          <Input
            id="outlined-select-currency"
            select
            label={t("randomTeamGenerator.teamSize")}
            defaultValue="2"
            sx={{ marginTop: "2rem" }}
            value={numberOfTeams}
            onChange={(e) => setNumberOfTeams(e.target.value)}
          >
            {teamNumberOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Input>
        </Container>
        <br />
        <Container sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {result.map((element, index) => (
            <Container
              key={element}
              sx={{
                border: "1px solid black",
                borderRadius: "0.5rem",
                color: "success.dark",
                marginBottom: "0.5rem",
              }}
            >
              <Divider />
              <Typography sx={{ color: "primary.dark" }}>
                Team {++index}
              </Typography>
              <Typography>{element.join(", ")}</Typography>
            </Container>
          ))}
        </Container>
      </Container>
      <br />
      <CalcButtons
        handleClear={handleClear}
        handleSubmit={() => setResult(generateRandomTeam(team, numberOfTeams))}
        type="generate"
      />
    </ThreeColumnLayout>
  );
}
