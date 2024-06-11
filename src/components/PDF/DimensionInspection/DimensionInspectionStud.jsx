import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import DimensionInspectionStudMain from "./DimensionInspectionStudMain";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  section: {
    margin: 10,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    fontSize: 11,
    marginBottom: 50,
  },
  header: {
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
  },
  cell: {
    display: "flex",
    width: "90px",
    height: "35px",
    padding: 5,
    border: "1px solid #000",
    textAlign: "center",
  },
  logo: {
    display: "flex",
    width: "200px",
    padding: 5,
    border: "1px solid #000",
    textAlign: "center",
  },
  rightSide: {
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
  },
  nestedCell: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  cell1: {
    display: "flex",
    width: "800px",
    padding: 5,
    border: "1px solid #000",
    textAlign: "center",
  },
  cell2: {
    display: "flex",
    padding: 5,
    border: "1px solid #000",
    textAlign: "left",
  },
  cell3: {
    display: "flex",
    padding: 5,
    border: "1px solid #000",
    textAlign: "center",
  },
  cellFooter: {
    display: "flex",
    width: "420px",
    padding: 5,
    border: "1px solid #000",
  },
  footer: {
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: "auto",
  },
});

const DimensionInspectionStud = ({ data }) => {
  const finalData = data?.observationValues.slice(5);

  return (
    <View style={styles.section}>
      <View style={styles.header} fixed>
        <Text style={{ width: "50%", ...styles.cell3 }}>ID:</Text>
        <Text
          style={{ width: "50%", ...styles.cell3 }}
          render={({ pageNumber, totalPages }) =>
            `Page No.: ${pageNumber} of ${totalPages}`
          }
        ></Text>
      </View>
      <View style={styles.header} fixed>
        <Text style={{ width: "33.3%", ...styles.cell3 }}>Item number</Text>
        <Text style={{ width: "33.3%", ...styles.cell3 }}>Total Length</Text>
        <Text style={{ width: "34%", ...styles.cell3 }}>Go / No Go Gauge</Text>
      </View>
      {finalData?.map((ele, idx) => (
        <DimensionInspectionStudMain
          key={idx}
          itemNo={idx + 6}
          totalLength={ele}
          goNoGo={"OK"}
        />
      ))}
    </View>
  );
};

export default DimensionInspectionStud;
