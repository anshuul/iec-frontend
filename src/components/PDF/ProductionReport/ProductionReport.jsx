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
import formatDate from "../utils/formatDate.js";
import ProductionReportMain from "./ProductionReportMain.jsx";

// Define styles for the components
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
    // width: "420px",
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

const Footer = () => (
  <View fixed>
    <View style={styles.header}>
      <Text
        style={{
          textAlign: "left",
          width: "800px",
          ...styles.cellFooter,
        }}
      >
        Non Productive Reasons Codes:
      </Text>
    </View>
    <View style={styles.header}>
      <Text
        style={{
          textAlign: "left",
          fontSize: "10px",
          width: "200px",
          ...styles.cellFooter,
        }}
      >
        A- No Power
      </Text>
      <Text
        style={{
          textAlign: "left",
          fontSize: "10px",
          width: "200px",
          ...styles.cellFooter,
        }}
      >
        C- Machine under Maintenance
      </Text>
      <Text
        style={{
          textAlign: "left",
          fontSize: "10px",
          width: "200px",
          ...styles.cellFooter,
        }}
      >
        E- No Material
      </Text>
      <Text
        style={{
          textAlign: "left",
          fontSize: "10px",
          width: "200px",
          ...styles.cellFooter,
        }}
      >
        G- Other
      </Text>
    </View>
    <View style={styles.header}>
      <Text
        style={{
          textAlign: "left",
          fontSize: "10px",
          width: "200px",
          ...styles.cellFooter,
        }}
      >
        B- Tooling problem
      </Text>
      <Text
        style={{
          textAlign: "left",
          fontSize: "10px",
          width: "200px",
          ...styles.cellFooter,
        }}
      >
        D- No Operator
      </Text>
      <Text
        style={{
          textAlign: "left",
          fontSize: "10px",
          width: "200px",
          ...styles.cellFooter,
        }}
      >
        F- Tool setting
      </Text>
    </View>
  </View>
);

const formatQuantity = (data) => {
  // Split the string at the space
  let parts = data.split(" ");

  // If there is a value in parenthesis, round it to two decimal places
  if (parts.length > 1) {
    let value = parseFloat(parts[1].replace(/\(|\)/g, ""));
    parts[1] = value.toFixed(2);
  }

  // Join the parts back together
  let result = parts.join(" ");

  return result;
};

const ProductionReport = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape" wrap>
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
            <Text style={styles.cell1}>Production Report</Text>
          </View>
          <View style={{ margin: 3 }}></View>

          <View style={styles.header}>
            <Text style={{ width: "100px", ...styles.cell3 }}>Machine No.</Text>
            <Text style={{ width: "230px", ...styles.cell3 }}></Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>
              Machine Name
            </Text>
            <Text style={{ width: "370px", ...styles.cell3 }}></Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "60px", ...styles.cell3 }}>Operator</Text>
            <Text style={{ width: "80px", ...styles.cell3 }}>SO No.</Text>
            <Text style={{ width: "80px", ...styles.cell3 }}>
              JOB Description
            </Text>
            <Text style={{ width: "80px", ...styles.cell3 }}>Start time</Text>
            <Text style={{ width: "80px", ...styles.cell3 }}>End Time</Text>
            <Text style={{ width: "40px", ...styles.cell3 }}>
              Production Hr
            </Text>

            <View style={styles.nestedCell}>
              <Text style={{ width: "140px", ...styles.cell3 }}>
                Non-Productive Hrs & reason code
              </Text>
              <View style={styles.header}>
                <Text
                  style={{ height: "38px", width: "20px", ...styles.cell3 }}
                >
                  A
                </Text>
                <Text style={{ width: "20px", ...styles.cell3 }}>B</Text>
                <Text style={{ width: "20px", ...styles.cell3 }}>C</Text>
                <Text style={{ width: "20px", ...styles.cell3 }}>D</Text>
                <Text style={{ width: "20px", ...styles.cell3 }}>E</Text>
                <Text style={{ width: "20px", ...styles.cell3 }}>F</Text>
                <Text style={{ width: "20px", ...styles.cell3 }}>G</Text>
              </View>
            </View>
            <View style={styles.nestedCell}>
              <Text style={{ width: "100px", ...styles.cell3 }}>
                Identification mark
              </Text>
              <View style={styles.header}>
                <Text style={{ width: "50px", ...styles.cell3 }}>OK Qty</Text>
                <Text style={{ width: "50px", ...styles.cell3 }}>
                  Rej. Qty.
                </Text>
              </View>
            </View>
            <Text style={{ width: "40px", ...styles.cell3 }}>Total Qty</Text>
            <Text style={{ width: "60px", ...styles.cell3 }}>
              Progressive total
            </Text>
            <Text style={{ width: "40px", ...styles.cell3 }}>Sign</Text>
          </View>
          {data?.processRows.map((ele, i) => (
            <View wrap={false}>
              <ProductionReportMain
                operator={ele.operatorName}
                soNo={data.poNo}
                jobDescription={ele.jobDescription}
                startTime={ele.startTime}
                endTime={ele.endTime}
                identificationMarkOk={
                  ele.orderQty ? formatQuantity(ele.orderQty) : ""
                }
                identificationMarkRej={
                  ele.orderQty ? formatQuantity(ele.orderQty) : ""
                }
                totalQuantity={ele.orderQty ? formatQuantity(ele.orderQty) : ""}
                progressiveTotal={
                  ele.orderQty ? formatQuantity(ele.orderQty) : ""
                }
              />
            </View>
          ))}
          <Footer />
        </View>
      </Page>
    </Document>
  );
};

export default ProductionReport;
