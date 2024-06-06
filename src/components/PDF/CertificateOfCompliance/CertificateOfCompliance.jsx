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
              Certificate of Compliance
            </Text>
          </View>
          <View style={styles.header} fixed>
            <Text style={{ width: "350px", ...styles.cell3 }}>
              COC No : {data?.cocNo}
            </Text>
            <Text style={{ width: "350px", ...styles.cell3 }}>
              Date : {formatDate(data?.date.toString())}
            </Text>
          </View>
          <View style={{ margin: 3 }} fixed></View>
          <Text style={{ fontSize: "12px", marginBottom: 5 }}>
            Customer name : {data?.customerName}
          </Text>
          <Text style={{ fontSize: "12px", marginBottom: 5 }}>
            Customer PO no. : {data?.customerPONO}
          </Text>
          <Text style={{ fontSize: "12px", marginBottom: 5 }}>
            S.O. no. : {data?.soNO}
          </Text>
          <Text style={{ fontSize: "12px", marginBottom: 5 }}>
            Item Description : {data?.itemDescription}
          </Text>
          <Text style={{ fontSize: "12px", marginBottom: 5 }}>
            Inspection Release Note No : {data?.inspectionReleaseNoteNo}
          </Text>
          <View style={{ margin: 10 }}></View>
          <Text style={{ fontSize: "16px" }}>1. {data?.itemDescription}</Text>
          <Text style={{ fontSize: "13px", marginLeft: "15" }}>
            Size: {data?.itemInfo.size}
          </Text>
          <Text style={{ fontSize: "13px", marginLeft: "15" }}>
            BSL Type: {data?.itemInfo.bslType}
          </Text>
          <Text style={{ fontSize: "13px", marginLeft: "15" }}>
            Raw material Heat No: {data?.itemInfo.rawMaterialHeatNo}
          </Text>
          <Text style={{ fontSize: "13px", marginLeft: "15" }}>
            Lot no: {data?.itemInfo.lotNO}
          </Text>
          <Text style={{ fontSize: "13px", marginLeft: "15" }}>
            PO Sr. No: {data?.itemInfo.poSrNO}
          </Text>
          <Text style={{ fontSize: "13px", marginLeft: "15" }}>
            Qty.: {data?.itemInfo.quantity}
          </Text>
          <View style={{ margin: 15 }}></View>
          <Text style={{ fontSize: "12px" }}>
            The undersigned certifies that the product was inspected by IEC
            representative in full compliance with the above mentioned
            Description including the requirements of API 20E, 2nd edition.
            Result found satisfactory at the time of Final Inspection.
          </Text>
          <View style={{ margin: 3 }}></View>
          <Text style={{ fontSize: "12px" }}>
            The undersigned retains the supporting documentation for a period of
            time as specified in the applicable product specification. If
            additional information is needed concerning this product, please
            contact the undersigned.
          </Text>
          <View style={{ margin: 10 }}></View>
          <Text style={{ fontSize: "12px", marginBottom: "5" }}>
            Email Id: iecbombay@gmail.com
          </Text>
          <Text style={{ fontSize: "12px", marginBottom: "5" }}>
            For, INDUSTRIAL ENGINEERING CORPORATION
          </Text>
          <Text style={{ fontSize: "12px", marginBottom: "5" }}>
            QC in Charge
          </Text>
          <Text style={{ fontSize: "12px", marginBottom: "5" }}>
            Pinank Patel
          </Text>
          <Text style={{ fontSize: "12px", marginBottom: "5" }}>
            Name, Sign and Stamp
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default CertificateOfCompliance;
