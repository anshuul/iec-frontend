import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import MaterialSlipMain from "./MaterialSlipMain";

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

const tableData = [
  {
    size: {
      diameter: {
        value: "92.3",
        dimension: "mm",
      },
      length: {
        value: "205",
        dimension: "mm",
      },
    },
    _id: "6625196a68281c1bbcd1ed58",
    materialSlipName: "Stud-M1501/PO156",
    itemDescription: "Stud",
    materialGrade: "B7",
    quantityRequired: "2156.117",
    quantityIssued: "2156.117",
    studquantity: "200",
    nutquantity: "400",
    poNo: "PO156",
    __v: 0,
  },
  {
    size: {
      diameter: {
        value: "92.3",
        dimension: "mm",
      },
      length: {
        value: "205",
        dimension: "mm",
      },
    },
    _id: "6625196a68281c1bbcd1ed5a",
    materialSlipName: "Nut-M1501/PO156",
    itemDescription: "2 Nut",
    materialGrade: "2H",
    quantityRequired: "4312.233",
    quantityIssued: "4312.233",
    studquantity: "200",
    nutquantity: "400",
    poNo: "PO156",
    __v: 0,
  },
];

const MaterialIssueSlip = ({ data }) => {
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
          <View style={styles.header}>
            <Text style={{ width: "800px", ...styles.cell3 }}>
              Material Issue Slip
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "350px", ...styles.cell3 }}>
              Sr. No : {data.materialSlipName}
            </Text>
            <Text style={{ width: "350px", ...styles.cell3 }}>
              Date : PRODUCTIONN START DATE
            </Text>
          </View>

          <View style={{ margin: 3 }}></View>

          <View style={styles.header}>
            <Text style={{ width: "300px", ...styles.cell2 }}>
              From: PRODUCTION DEPT
            </Text>
            <Text style={{ width: "300px", ...styles.cell2 }}>To: STORE</Text>
          </View>

          <View style={styles.rightSide}>
            <Text style={{ width: "93px", ...styles.cell3 }}>Sr. No </Text>
            <Text style={{ width: "93px", ...styles.cell3 }}>
              Item Description
            </Text>
            <Text style={{ width: "93px", ...styles.cell3 }}>
              Material Grade
            </Text>
            <Text style={{ width: "93px", ...styles.cell3 }}>Cutting Size</Text>
            <Text style={{ width: "93px", ...styles.cell3 }}>Qty Required</Text>
            <Text style={{ width: "140px", ...styles.cell3 }}>Qty Issue</Text>
            <Text style={{ width: "140px", ...styles.cell3 }}>Remarks</Text>
          </View>

          <MaterialSlipMain
            srNo={1}
            itemDescription={data.itemDescription}
            materialGrade={data.materialGrade}
            cuttingSize={`${data.size.diameter?.value} ${data.size.diameter?.dimension}, ${data.size.length?.value} ${data.size.length?.dimension}`}
            qtyRequired={data.quantityRequired}
            qtyIssue={data.quantityIssued}
            remarks={data.remarks}
          />

          <View style={styles.footer} fixed>
            <Text style={{ ...styles.cellFooter }} fixed>
              Requested by:
            </Text>
            <Text style={{ ...styles.cellFooter }} fixed>
              Issue by:
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MaterialIssueSlip;