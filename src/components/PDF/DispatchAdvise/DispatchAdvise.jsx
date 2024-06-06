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
    textAlign: "left",
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

const CertificateOfCompliance = ({ data }) => {
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
              Dispatch Advice
            </Text>
          </View>
          <View style={styles.header} fixed>
            <Text style={{ width: "350px", ...styles.cell3 }}>
              DA No : {data?.daNo}
            </Text>
            <Text style={{ width: "350px", ...styles.cell3 }}>
              Date: {formatDate(data?.date.toString())}
            </Text>
          </View>
          <View style={{ margin: 3 }} fixed></View>

          <View style={{ ...styles.nestedCell, ...styles.cell2 }}>
            <Text style={styles.cell1}>1. S.O No. : {data?.soNO}</Text>
            <Text style={styles.cell1}>
              2. Product Description : {data?.productionDescription}
            </Text>
            <Text style={styles.cell1}>3. Customer : {data?.customerName}</Text>
            <Text style={styles.cell1}>
              4. Customer P.O. No. : {data?.customerPONO}
            </Text>
            <Text style={styles.cell1}>
              5. Inspection Release Note No. : {data?.InspectionReleaseNoteNo}
            </Text>
            <Text style={styles.cell1}>
              6. Customer/3rd Party lnsp. Report No :{" "}
              {data?.customerPartylnspReportNo}
            </Text>
            <Text style={styles.cell1}>
              7. Mode of Dispatch : {data?.modeOfDispatch}
            </Text>

            <View style={{ margin: 10 }}></View>

            <Text
              style={{
                ...styles.cell1,
                fontSize: "16px",
                textDecoration: "underline",
              }}
            >
              Check List Prior to Dispatch
            </Text>
          </View>

          <View style={styles.header}>
            <View
              style={{
                width: "50%",
                ...styles.nestedCell,
                border: "1px solid #000",
              }}
            >
              <View style={{ margin: 13 }}></View>
              <Text style={styles.cell1}>1. Visual Inspection</Text>
              <Text style={styles.cell1}>2. Cleaning Done</Text>
              <Text style={styles.cell1}>3. Xyz</Text>
              <Text style={styles.cell1}>4. Xyz</Text>
            </View>

            <View
              style={{
                width: "50%",
                ...styles.nestedCell,
                border: "1px solid #000",
              }}
            >
              <Text style={styles.cell3}>Remark</Text>
              <Text style={styles.cell3}>
                {data?.checkListPriorToDispatch.visualInspection}
              </Text>
              <Text style={styles.cell3}>
                {data?.checkListPriorToDispatch.cleaningDone}
              </Text>
              <Text style={styles.cell3}>
                {data?.checkListPriorToDispatch.xyz}
              </Text>
              <Text style={styles.cell3}></Text>
            </View>
          </View>
        </View>
      </Page>
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
              Dispatch Advice
            </Text>
          </View>
          <View style={styles.header} fixed>
            <Text style={{ width: "350px", ...styles.cell3 }}>
              DA No : {data?.daNo}
            </Text>
            <Text style={{ width: "350px", ...styles.cell3 }}>
              Date: {formatDate(data?.date.toString())}
            </Text>
          </View>
          <View style={{ margin: 3 }} fixed></View>

          <View style={{ ...styles.nestedCell, ...styles.cell2 }}>
            <Text style={styles.cell1}>
              8. Type of Packing: {data?.typeOfPacking}
            </Text>
            <Text style={{ ...styles.cell1, marginLeft: 10 }}>
              All items Wrapped with Bubble sheet:- {data?.bubblesheet}
            </Text>

            <View style={{ margin: 5 }}></View>

            <Text
              style={{
                ...styles.cell1,
                fontSize: "14px",
                textDecoration: "underline",
              }}
            >
              Item Dispatched
            </Text>
            <Text style={{ ...styles.cell1, marginLeft: 10 }}>
              1. Item Description: {data?.itemDispatched.itemDescription}
            </Text>
            <Text style={{ ...styles.cell1, marginLeft: 15 }}>
              S/No: {data?.itemDispatched.sNo}
            </Text>
            <Text style={{ ...styles.cell1, marginLeft: 15 }}>
              Qty: {data?.itemDispatched.quantity} NOS
            </Text>

            <View style={{ margin: 10 }}></View>

            <Text style={{ ...styles.cell1 }}>Prepare By</Text>
            <Text style={{ ...styles.cell1 }}>
              Name and Signature :PINANK PATEL
            </Text>
            <Text style={{ ...styles.cell1 }}>DATE: : 20/02/2024</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CertificateOfCompliance;
