import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import DimensionInspectionMain from "./DimensionInspectionMain.jsx";

// Define styles for the components
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
    fontSize: 12,
    marginBottom: 50,
  },
  header: {
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
  },
  cell: {
    display: "flex",
    width: "120px",
    height: "35px",
    padding: 5,
    border: "1px solid #000",
    textAlign: "center",
  },
  logo: {
    display: "flex",
    width: "320px",
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
    width: "400px",
    padding: 5,
    border: "1px solid #000",
    textAlign: "center",
  },
  cell3: {
    display: "flex",
    // width: "400px",
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

const DimensionInspection = ({ data }) => {
  return (
    <View style={styles.section}>
      <View style={styles.header} fixed>
        <View style={styles.logo}>
          <Image
            src="/loginlogo.jpeg"
            style={{ width: "50px", alignSelf: "center" }}
          />
          <Text>Industrial Engineering Corporation</Text>
        </View>

        <View style={styles.rightSide}>
          <View style={styles.nestedCell}>
            <Text style={styles.cell}>Format No.</Text>
            <Text style={styles.cell}>FR-PR-03</Text>
          </View>
          <View style={styles.nestedCell}>
            <Text style={styles.cell}>Revision No.</Text>
            <Text style={styles.cell}>00</Text>
          </View>
          <View style={styles.nestedCell}>
            <Text style={styles.cell}>Page No.</Text>
            <Text
              style={styles.cell}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} of ${totalPages}`
              }
            ></Text>
          </View>
          <View style={styles.nestedCell}>
            <Text style={styles.cell}>Date</Text>
            <Text style={styles.cell}>01.10.2023</Text>
          </View>
        </View>
      </View>
      <View style={styles.header} fixed>
        <Text style={styles.cell1}>Dimension Inspection Report</Text>
      </View>
      <View style={{ margin: 3 }}></View>
      <View style={styles.header}>
        <Text style={{ width: "100px", ...styles.cell3 }}>
          Routing Sheet No.
        </Text>
        <Text style={{ width: "200px", ...styles.cell3 }}></Text>
        <Text style={{ width: "100px", ...styles.cell3 }}>
          Routing Sheet Date
        </Text>
        <Text style={{ width: "110px", ...styles.cell3 }}></Text>
        <Text style={{ width: "100px", ...styles.cell3 }}>S.O. No.</Text>
        <Text style={{ width: "200px", ...styles.cell3 }}></Text>
      </View>

      <View style={styles.header}>
        <Text style={{ width: "100px", ...styles.cell3 }}>
          Item Description
        </Text>
        <Text style={{ width: "300px", ...styles.cell3 }}></Text>
        <Text style={{ width: "110px", ...styles.cell3 }}>Item Qty</Text>
        <Text style={{ width: "300px", ...styles.cell3 }}></Text>
      </View>

      <View style={styles.header}>
        <Text style={{ width: "100px", ...styles.cell3 }}>Material</Text>
        <Text style={{ width: "200px", ...styles.cell3 }}></Text>
        <Text style={{ width: "100px", ...styles.cell3 }}>Drg. No</Text>
        <Text style={{ width: "110px", ...styles.cell3 }}></Text>
        <Text style={{ width: "100px", ...styles.cell3 }}>Rev.No</Text>
        <Text style={{ width: "200px", ...styles.cell3 }}></Text>
      </View>

      <View style={styles.header}>
        <Text style={{ width: "30px", ...styles.cell3 }}>Sr. No.</Text>
        <Text style={{ width: "90px", ...styles.cell3 }}>
          Required Parameters
        </Text>
        <Text style={{ width: "90px", ...styles.cell3 }}>
          Required Dimensions in mm
        </Text>
        <View style={styles.nestedCell}>
          <Text style={{ width: "80px", ...styles.cell3 }}>
            Tolerance in mm (±)
          </Text>
          <View style={styles.header}>
            <Text style={{ width: "40px", ...styles.cell3 }}>min</Text>
            <Text style={{ width: "40px", ...styles.cell3 }}>max</Text>
          </View>
        </View>
        <View style={styles.nestedCell}>
          <Text style={{ width: "220px", ...styles.cell3 }}>
            Observed Dimensions in mm
          </Text>
          <View style={styles.header}>
            <Text style={{ width: "44px", ...styles.cell3 }}>1</Text>
            <Text style={{ width: "44px", ...styles.cell3 }}>2</Text>
            <Text style={{ width: "44px", ...styles.cell3 }}>3</Text>
            <Text style={{ width: "44px", ...styles.cell3 }}>4</Text>
            <Text style={{ width: "44px", ...styles.cell3 }}>5</Text>
          </View>
        </View>

        <Text style={{ width: "80px", ...styles.cell3 }}>Operator Name</Text>
        <Text style={{ width: "50px", ...styles.cell3 }}>Date</Text>
        <Text style={{ width: "80px", ...styles.cell3 }}>Instruments Used</Text>
        <Text style={{ width: "80px", ...styles.cell3 }}>
          Instruments ID No.
        </Text>
      </View>
      {data && (
        <>
          <DimensionInspectionMain
            srNo={1}
            reqParameters={"Across Flat"}
            reqDimensions={`${data.minMaxData.AF.MIN} to ${data.minMaxData.AF.MAX}`}
            tolerance1={"-"}
            tolerance2={"-"}
            observedDimensions1={data.observationValuesNut?.AF[0]}
            observedDimensions2={data.observationValuesNut?.AF[1]}
            observedDimensions3={data.observationValuesNut?.AF[2]}
            observedDimensions4={data.observationValuesNut?.AF[3]}
            observedDimensions5={data.observationValuesNut?.AF[4]}
            operatorName={data.operatorName}
            instrumentsUsed={data.instrumentUsed}
          />
          <DimensionInspectionMain
            srNo={2}
            reqParameters={"Across Cross"}
            reqDimensions={`${data.minMaxData.AC.MIN} to ${data.minMaxData.AC.MAX}`}
            tolerance1={"-"}
            tolerance2={"-"}
            observedDimensions1={data.observationValuesNut?.AC[0]}
            observedDimensions2={data.observationValuesNut?.AC[1]}
            observedDimensions3={data.observationValuesNut?.AC[2]}
            observedDimensions4={data.observationValuesNut?.AC[3]}
            observedDimensions5={data.observationValuesNut?.AC[4]}
            operatorName={data.operatorName}
            instrumentsUsed={data.instrumentUsed}
          />
          <DimensionInspectionMain
            srNo={3}
            reqParameters={"Nut Thickness"}
            reqDimensions={`${data.minMaxData.NUT_THICKNESS.MIN} to ${data.minMaxData.NUT_THICKNESS.MAX}`}
            tolerance1={"-"}
            tolerance2={"-"}
            observedDimensions1={data.observationValuesNut?.NUT_THICKNESS[0]}
            observedDimensions2={data.observationValuesNut?.NUT_THICKNESS[1]}
            observedDimensions3={data.observationValuesNut?.NUT_THICKNESS[2]}
            observedDimensions4={data.observationValuesNut?.NUT_THICKNESS[3]}
            observedDimensions5={data.observationValuesNut?.NUT_THICKNESS[4]}
            operatorName={data.operatorName}
            instrumentsUsed={data.instrumentUsed}
          />
          <DimensionInspectionMain
            srNo={4}
            reqParameters={"Gauges"}
            reqDimensions={"Go No Go"}
            tolerance1={"-"}
            tolerance2={"-"}
            observedDimensions1={"OK"}
            observedDimensions2={"OK"}
            observedDimensions3={"OK"}
            observedDimensions4={"OK"}
            observedDimensions5={"OK"}
            operatorName={data.operatorName}
            instrumentsUsed={data.instrumentUsed}
          />
        </>
      )}
      <DimensionInspectionMain />
      <DimensionInspectionMain />
      <DimensionInspectionMain />
      <DimensionInspectionMain />

      <View style={styles.header}>
        <Text style={{ width: "80px", ...styles.cell3 }}></Text>
        <Text
          style={{
            textAlign: "left",
            width: "280px",
            ...styles.cellFooter,
          }}
        >
          Remarks:
        </Text>
        <Text
          style={{
            textAlign: "left",
            width: "280px",
            ...styles.cellFooter,
          }}
        >
          Inspection Done By:
        </Text>
        <Text style={{ width: "80px", ...styles.cell3 }}></Text>
      </View>
    </View>
  );
};

export default DimensionInspection;