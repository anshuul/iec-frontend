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

const DimensionInspectionMain = ({
  srNo,
  reqParameters,
  reqDimensions,
  tolerance1,
  tolerance2,
  observedDimensions1,
  observedDimensions2,
  observedDimensions3,
  observedDimensions4,
  observedDimensions5,
  operatorName,
  date,
  instrumentsUsed,
  instrumentsId,
}) => {
  return (
    <View style={styles.header} wrap={false}>
      <Text style={{ width: "30px", ...styles.cell3 }}>{srNo}</Text>
      <Text style={{ width: "90px", ...styles.cell3 }}>{reqParameters}</Text>
      <Text style={{ width: "90px", ...styles.cell3 }}>{reqDimensions}</Text>
      <Text style={{ width: "40px", ...styles.cell3 }}>{tolerance1}</Text>
      <Text style={{ width: "40px", ...styles.cell3 }}>{tolerance2}</Text>
      <Text style={{ width: "44px", ...styles.cell3 }}>
        {observedDimensions1}
      </Text>
      <Text style={{ width: "44px", ...styles.cell3 }}>
        {observedDimensions2}
      </Text>
      <Text style={{ width: "44px", ...styles.cell3 }}>
        {observedDimensions3}
      </Text>
      <Text style={{ width: "44px", ...styles.cell3 }}>
        {observedDimensions4}
      </Text>
      <Text style={{ width: "44px", ...styles.cell3 }}>
        {observedDimensions5}
      </Text>
      <Text style={{ width: "80px", ...styles.cell3 }}>{operatorName}</Text>
      <Text style={{ width: "50px", ...styles.cell3 }}>{date}</Text>
      <Text style={{ width: "80px", ...styles.cell3 }}>{instrumentsUsed}</Text>
      <Text style={{ width: "80px", ...styles.cell3 }}>{instrumentsId}</Text>
    </View>
  );
};

export default DimensionInspectionMain;