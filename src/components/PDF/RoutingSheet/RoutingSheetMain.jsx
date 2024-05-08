import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  header: {
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
  },
  cell3: {
    display: "flex",
    // width: "400px",
    padding: 5,
    border: "1px solid #000",
    textAlign: "center",
  },
});

const RoutingSheetMain = ({
  srNo,
  date,
  operatorName,
  machineNo,
  processDescription,
  procedureNo,
  orderQuantity,
  processQuantity,
  startDate,
  endDate,
  optSign,
  remarks,
}) => {
  return (
    <View style={styles.header} wrap={false}>
      <Text style={{ width: "30px", ...styles.cell3 }}>{srNo}.</Text>
      <Text style={{ width: "70px", ...styles.cell3 }}>{date}</Text>
      <Text style={{ width: "70px", ...styles.cell3 }}>{operatorName}</Text>
      <Text style={{ width: "70px", ...styles.cell3 }}>{machineNo}</Text>
      <Text style={{ width: "70px", ...styles.cell3 }}>
        {processDescription}
      </Text>
      <Text style={{ width: "70px", ...styles.cell3 }}>{procedureNo}</Text>
      <Text style={{ width: "70px", ...styles.cell3 }}>{orderQuantity}</Text>
      <Text style={{ width: "70px", ...styles.cell3 }}>{processQuantity}</Text>
      <Text style={{ width: "70px", ...styles.cell3 }}>{startDate}</Text>
      <Text style={{ width: "70px", ...styles.cell3 }}>{endDate}</Text>
      <Text style={{ width: "70px", ...styles.cell3 }}>{optSign}</Text>
      <Text style={{ width: "70px", ...styles.cell3 }}>{remarks}</Text>
    </View>
  );
};

export default RoutingSheetMain;
