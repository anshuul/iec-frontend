import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import formatDate from "../utils/formatDate";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
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

const HeatTreatmentReport = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.section}>
          <View style={styles.header} fixed>
            <View style={styles.logo}>
              <Image
                src="/loginlogo.jpeg"
                style={{ width: "30px", alignSelf: "center" }}
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
            <Text style={{ width: "800px", ...styles.cell3 }}>
              Hardness Test Report
            </Text>
          </View>
          <View style={styles.header} fixed>
            <Text style={{ width: "350px", ...styles.cell3 }}>
              HDR No : {data?.hdrNo}
            </Text>
            <Text style={{ width: "350px", ...styles.cell3 }}>
              Date: {formatDate(data?.date.toString())}
            </Text>
          </View>
          <View style={{ margin: 3 }} fixed></View>

          <Text>Customer Name : </Text>
          <View style={{ margin: 2 }}></View>
          <Text style={{ fontSize: "14px" }}>{data?.customerName} </Text>

          <View style={{ margin: 5 }}></View>

          <Text>Customer PO No.: </Text>
          <View style={{ margin: 2 }}></View>
          <Text style={{ fontSize: "14px" }}>{data?.customerPoNo} </Text>

          <View style={{ margin: 5 }}></View>

          <Text>SO No: </Text>
          <View style={{ margin: 2 }}></View>
          <Text style={{ fontSize: "14px" }}>{data?.soNo}</Text>

          <View style={styles.header}>
            <Text style={{ width: "5%", ...styles.cell3 }}>Sr. No</Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>Description</Text>
            <Text style={{ width: "5%", ...styles.cell3 }}>Qty.</Text>
            <Text style={{ width: "15%", ...styles.cell3 }}>Heat No.</Text>
            <Text style={{ width: "15%", ...styles.cell3 }}>Batch No </Text>
            <Text style={{ width: "15%", ...styles.cell3 }}>Sr. No</Text>
            <Text style={{ width: "15%", ...styles.cell3 }}>
              Hardness (HRB)
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "5%", ...styles.cell3 }}>1.</Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.itemDescription}
            </Text>
            <Text style={{ width: "5%", ...styles.cell3 }}>
              {data?.quantity}
            </Text>
            <Text
              style={{
                width: "15%",
                ...styles.cell3,
              }}
            >
              {data?.heatNo}
            </Text>
            <View style={{ width: "45%", ...styles.nestedCell }}>
              <View style={{ ...styles.header }}>
                <Text style={{ width: "33%", ...styles.cell3 }}> </Text>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "34%", ...styles.cell3 }}></Text>
              </View>
              <View style={{ ...styles.header }}>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "34%", ...styles.cell3 }}></Text>
              </View>
              <View style={{ ...styles.header }}>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "34%", ...styles.cell3 }}></Text>
              </View>
              <View style={{ ...styles.header }}>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "34%", ...styles.cell3 }}></Text>
              </View>
              <View style={{ ...styles.header }}>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "34%", ...styles.cell3 }}></Text>
              </View>
              <View style={{ ...styles.header }}>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "34%", ...styles.cell3 }}></Text>
              </View>
              <View style={{ ...styles.header }}>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "34%", ...styles.cell3 }}></Text>
              </View>
              <View style={{ ...styles.header }}>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "34%", ...styles.cell3 }}></Text>
              </View>
              <View style={{ ...styles.header }}>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "34%", ...styles.cell3 }}></Text>
              </View>
              <View style={{ ...styles.header }}>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "33%", ...styles.cell3 }}></Text>
                <Text style={{ width: "34%", ...styles.cell3 }}></Text>
              </View>
            </View>
          </View>
          <Text style={{ fontSize: "12px" }}>Material : {data?.material}</Text>
          <View style={{ margin: 2 }}></View>
          <Text style={{ fontSize: "12px" }}>
            Acceptable Hardness : {data?.acceptableHardness}
          </Text>
          <View style={{ margin: 2 }}></View>
          <Text style={{ fontSize: "12px" }}>
            Test Method : {data?.testMethod}
          </Text>
          <View style={{ margin: 2 }}></View>
          <Text style={{ fontSize: "12px" }}>
            Instrument Name : {data?.instrumentName}
          </Text>
          <View style={{ margin: 2 }}></View>
          <Text style={{ fontSize: "12px" }}>
            Instrument ID No : {data?.instrumentID}
          </Text>
          <View style={{ margin: 2 }}></View>
          <Text style={{ fontSize: "12px" }}>
            Acceptance Standard : {data?.acceptanceStandard}
          </Text>
          <View style={{ margin: 2 }}></View>
          <Text style={{ fontSize: "12px" }}>
            Stage of Inspection : {data?.stageOfInspection}
          </Text>
          <View style={{ margin: 2 }}></View>
          <Text style={{ fontSize: "12px" }}>
            Test Result : {data?.testResult}
          </Text>

          <View style={{ margin: 8 }}></View>

          <Text style={{ fontSize: "12px" }}>For, </Text>
          <Text style={{ fontSize: "12px" }}>
            INDUSTRIAL ENGINEERING CORPORATION{" "}
          </Text>
          <Text style={{ fontSize: "12px" }}>Name: Pinank Patel.</Text>
          <View style={{ margin: 2 }}></View>
          <Text style={{ fontSize: "12px" }}>Signature:</Text>
          <View style={{ margin: 2 }}></View>
          <Text style={{ fontSize: "12px" }}>
            Designation: Quality Control Department
          </Text>
          <View style={{ margin: 2 }}></View>
          <Text style={{ fontSize: "12px" }}>Tested By: </Text>
        </View>
      </Page>
    </Document>
  );
};

export default HeatTreatmentReport;
