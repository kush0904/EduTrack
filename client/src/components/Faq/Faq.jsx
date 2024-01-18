import { Box, useTheme } from "@mui/material";
import Header from "../Global/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";

const FAQ = ({ userName, userId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" style={{ overflow: "auto", height: "87vh" }}>
      <Header title="Edutrack FAQs" subtitle={`Welcome, ${userName} (User ID: ${userId})`} />

      <Accordion defaultExpanded style={{ margin: "4vh" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What is Edutrack?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Edutrack is a platform designed to help users track their academic journey. It provides tools and features for visualizing academic progress, setting goals, managing resources, and staying organized.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ margin: "4vh" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How can I track my academic progress on Edutrack?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Edutrack offers intuitive graphs, charts, and visuals to help you track your academic performance. Navigate to the 'Academic Progress' section to view detailed insights into your grades, assignments, and overall progress.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ margin: "4vh" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Tell me more about the Resource Library feature.
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Edutrack's Resource Library is a collection of educational books. You can explore and add books to your reading list. The library is a valuable tool for enhancing your knowledge and academic journey.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ margin: "4vh" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            How do I manage my academic goals on Edutrack?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            The Goals Manager in Edutrack allows you to set, track, and manage your academic goals. You can add goals, set deadlines, and monitor your progress using visual indicators.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ margin: "4vh" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Can I visualize my goals on a calendar in Edutrack?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Absolutely! Edutrack provides a Calendar feature where you can visualize your academic goals, deadlines, and events. The calendar helps you stay organized and focused on your academic journey.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion style={{ margin: "4vh" }}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography color={colors.greenAccent[500]} variant="h5">
      Is Edutrack completely free to use?
    </Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography>
      Yes, Edutrack is completely free to use. All features, including academic tracking, the resource library, goals manager, and calendar visuals, are available without any cost. Enjoy a full suite of tools to enhance your academic journey at no charge.
    </Typography>
  </AccordionDetails>
</Accordion>

    </Box>
  );
};

export default FAQ;
