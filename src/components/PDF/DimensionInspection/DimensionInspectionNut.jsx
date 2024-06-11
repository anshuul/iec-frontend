import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import DimensionInspectionNutMain from "./DimensionInspectionNutMain";

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

const DimensionInspectionNut = ({ data }) => {
  const finalAC = data?.observationValuesNut.AC.slice(5);
  const finalAF = data?.observationValuesNut.AF.slice(5);
  const finalNutThickness = data?.observationValuesNut.NUT_THICKNESS.slice(5);
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
      <View style={styles.header}>
        <Text style={{ width: "20%", ...styles.cell3 }}>Item number</Text>
        <Text style={{ width: "20%", ...styles.cell3 }}>Across Flat</Text>
        <Text style={{ width: "20%", ...styles.cell3 }}>Across Corner</Text>
        <Text style={{ width: "20%", ...styles.cell3 }}>Nut Thickness</Text>
        <Text style={{ width: "20%", ...styles.cell3 }}>Gauge</Text>
      </View>
      {finalAC?.map((ele, idx) => (
        <DimensionInspectionNutMain
          key={idx}
          itemNo={idx + 6}
          acrossFlat={finalAF[idx]}
          acrossCorner={ele}
          nutThickness={finalNutThickness[idx]}
          gauge={"OK"}
        />
      ))}
    </View>
  );
};

export default DimensionInspectionNut;