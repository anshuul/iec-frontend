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

const InspectionReleaseNote = ({ data }) => {
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
              Inspection Release Note
            </Text>
          </View>
          <View style={styles.header} fixed>
            <Text style={{ width: "350px", ...styles.cell3 }}>
              IRN No : {data?.irnNo}
            </Text>
            <Text style={{ width: "350px", ...styles.cell3 }}>
              Date : {formatDate(data?.date.toString())}
            </Text>
          </View>
          <View style={{ margin: 3 }} fixed></View>

          <View style={{ ...styles.nestedCell, ...styles.cell2 }}>
            <Text>S.O No. : {data?.soNO}</Text>
            <Text>Customer Name: {data?.customerName}</Text>
            <Text>Customer PO No.: {data?.customerPONO}</Text>
            <Text>Product Description: {data?.productionItemDescription}</Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "5%", ...styles.cell3 }}>Sr. No.</Text>
            <Text style={{ width: "80%", ...styles.cell3 }}>
              Item Description
            </Text>
            <Text style={{ width: "15%", ...styles.cell3 }}>Qty</Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "5%", ...styles.cell3 }}>1</Text>
            <View style={{ width: "80%", ...styles.cell2 }}>
              <Text>Size : {data?.itemInfo.size}</Text>
              <Text>BSL Type: {data?.itemInfo.bslType}</Text>
              <Text>
                Raw material Heat No : {data?.itemInfo.rawMaterialHeatNo}
              </Text>
              <Text>Lot No: {data?.itemInfo.lotNO}</Text>
              <Text>Material : {data?.itemInfo.material}</Text>
              <Text>Sr. No : {data?.itemInfo.poSrNO}</Text>
            </View>
            <Text style={{ width: "15%", ...styles.cell3 }}>
              {data?.itemInfo.quantity} NOS
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "100%", ...styles.cell2 }}>
              Applicable Standard :{" "}
              {data?.applicableStandardData.applicableStandard}
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell2 }}>
              MPI Examination Report
            </Text>
            <Text style={{ width: "70%", ...styles.cell2 }}>
              {data?.applicableStandardData.mpiExaminationReport}
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell2 }}>
              UT Test Report
            </Text>
            <Text style={{ width: "70%", ...styles.cell2 }}>
              {data?.applicableStandardData.utTestReport}
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell2 }}>
              Visual Inspection
            </Text>
            <Text style={{ width: "70%", ...styles.cell2 }}>
              {data?.applicableStandardData.visualInspection}
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell2 }}>
              Marking Monogramme
            </Text>
            <Text style={{ width: "70%", ...styles.cell2 }}>
              {data?.applicableStandardData.markingMonogramme}
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell2 }}>MTC</Text>
            <Text style={{ width: "70%", ...styles.cell2 }}>
              {data?.applicableStandardData.mtc}
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell2 }}>
              HEAT TREATMENT
            </Text>
            <Text style={{ width: "70%", ...styles.cell2 }}>
              {data?.applicableStandardData.heatTreatment}
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell2 }}>Coating</Text>
            <Text style={{ width: "70%", ...styles.cell2 }}>
              {data?.applicableStandardData.coating}
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell2 }}>
              Visual and Physical Inspection of Colour and Coating
            </Text>
            <Text style={{ width: "70%", ...styles.cell2 }}>
              {data?.applicableStandardData.visualAndPhysicalInspection}
            </Text>
          </View>

          <View style={{ margin: 15 }}></View>

          <Text>Name: Pinank Patel.</Text>
          <View style={{ margin: 5 }}></View>
          <Text>Signature:</Text>
          <View style={{ margin: 5 }}></View>
          <Text>Date: 20.02.2024.</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InspectionReleaseNote;
