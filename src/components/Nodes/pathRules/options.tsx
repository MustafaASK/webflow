import React, { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import Divider from "@mui/material/Divider";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import { useReactFlowContext } from "../../../context/reactFlowContext";
import Section from "./sections";
import PathName from "./name";
// import NodesJson from "../../../content/nodes.json";
// const { NODES } = NodesJson;
import "./path-rule.scss";
import { generateUUID } from "../../../constant/helper";

const PathRulesOptions = () => {
  const [expanded, setExpanded] = React.useState<string | false>("panel2");
  const { state, updatePathRulesNodeData, deletePathRules } =
    useReactFlowContext();
  const { elementSelected } = state || {};
  const { id: nodeId, data } = elementSelected || {};
  const { rules } = data?.payload || {};

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handelAdd = (ruleId: any) => {
    let data = {
      id: generateUUID(),
      field: "",
      condition: "",
      text: "",
    };
    updatePathRulesNodeData(data, nodeId, "AND", ruleId);
  };
  const handleOr = () => {
    let data = {
      id: generateUUID(),
      condition: [
        {
          id: generateUUID(),
          field: "",
          condition: "",
          text: "",
        },
      ],
    };
    updatePathRulesNodeData(data, nodeId, "OR", "");
  };

  const handleDelete = (ruleId: string, itemId: string) => {
    deletePathRules(nodeId, ruleId, itemId);
  };

  useEffect(() => {
    if (!rules?.length) {
      handleOr();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rules?.length]);
  return (
    <div className="path-rule-container">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Name</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PathName nodeId={nodeId} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Rule setup & testing</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {rules?.map((rule: any, parentIndex: number) => {
            return (
              <React.Fragment key={rule.id}>
                <Box
                  sx={{
                    marginBottom: "10px",
                    fontWeight: 500,
                  }}
                >
                  Only continue if…
                </Box>
                {rule?.condition?.map((item: any, index: number) => {
                  return (
                    <React.Fragment key={item.id}>
                      <Section
                        key={item.id}
                        item={item}
                        ruleId={rule.id}
                        nodeId={nodeId}
                        handleDelete={handleDelete}
                      />
                      {rule?.condition?.length - 1 === index &&
                        parentIndex !== rules.length - 1 && (
                          <Button
                            type="button"
                            variant="contained"
                            startIcon={<AddOutlinedIcon />}
                            onClick={() => handelAdd(rule.id)}
                          >
                            And
                          </Button>
                        )}
                    </React.Fragment>
                  );
                })}
                {parentIndex === rules.length - 1 && (
                  <Box>
                    <Button
                      type="button"
                      variant="contained"
                      startIcon={<AddOutlinedIcon />}
                      onClick={() => handelAdd(rule.id)}
                    >
                      And
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      startIcon={<AddOutlinedIcon />}
                      sx={{
                        marginLeft: "10px",
                      }}
                      onClick={handleOr}
                    >
                      Or
                    </Button>
                  </Box>
                )}
                {rules?.length - 1 !== parentIndex && (
                  <Box
                    sx={{
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <Divider />
                  </Box>
                )}
              </React.Fragment>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default PathRulesOptions;
