/* eslint-disable no-unused-vars */
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CheckIcon from "@mui/icons-material/Check";
import Divider from "@mui/material/Divider";
import {
  capitalize,
  capitalizeWords,
  formatDescription,
} from "../../../hooks/useFormat";

export default function BookingDetail({ offerObj }) {
  const getDescriptions = () => {
    if (offerObj.room?.description?.text) {
      return formatDescription(offerObj.room?.description?.text);
    } else {
      return null;
    }
  };

  const descriptions = getDescriptions();

  const { bedType, beds } = offerObj.room?.typeEstimated || {};
  const bedInfo = bedType && beds ? `${capitalize(bedType)} ${beds}` : "-";

  const cancelInfo = offerObj.policies?.cancellations?.[0] || {};
  const cancelDescription = cancelInfo.description?.text;
  const cancelDeadline = cancelInfo.deadline;

  const paymentType = capitalize(offerObj.policies?.paymentType) || "-";

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box sx={{ width: "70%", borderRadius: 1 }}>
        <List sx={{ border: "1px" }}>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText
              primary={capitalizeWords(
                offerObj.room?.typeEstimated?.category?.replace("_", " ")
              )}
              secondary="Room Type"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary={bedInfo} secondary="Beds" />
          </ListItem>
          {/* <Divider />
                    <ListItem>
                        <ListItemIcon>
                            <CheckIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                extractSquareMeters(offerObj.room?.description?.text)[0] 
                                + " - " + extractSquareMeters(offerObj.room?.description?.text)[1] 
                                + " \u33A1"
                            }
                            secondary="Area"
                        />
                    </ListItem> */}
          <Divider />
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                cancelDescription || cancelDeadline ? (
                  <>
                    {cancelDescription}
                    {cancelDescription && cancelDeadline && <br />}
                    {cancelDeadline && `Available before ${cancelDeadline}`}
                  </>
                ) : (
                  "-"
                )
              }
              secondary="Cancellation"
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary={paymentType} secondary="Payment" />
          </ListItem>
          {/* <Divider />
                    {descriptions && descriptions.map((el, index) => (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <CheckIcon />
                            </ListItemIcon>
                            <ListItemText primary={capitalizeWords(el)} />
                        </ListItem>
                    ))} */}
          <Divider />
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                offerObj.price?.total + " (" + offerObj.price?.currency + ")"
              }
              secondary="Price"
            />
          </ListItem>
          <Divider />
        </List>
      </Box>
    </Box>
  );
}
