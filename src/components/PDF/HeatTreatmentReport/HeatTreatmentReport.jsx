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
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 180,
    width: "100%",
    padding: 2,
    border: "2px solid #000",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    border: "2px solid #000",
    objectPosition: "50% 50%",
    margin: "2px"
  },
});

const HeatTreatmentReport = ({ data }) => {
  console.log("data in pdf", data)
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
              Heat Treatment Report
            </Text>
          </View>
          <View style={styles.header} fixed>
            <Text style={{ width: "350px", ...styles.cell3 }}>
              HTR No : {data?.htrNo}
            </Text>
            <Text style={{ width: "350px", ...styles.cell3 }}>
              Date : {formatDate(data?.date.toString())}
            </Text>
          </View>
          <View style={{ margin: 3 }} fixed></View>

          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell2 }}>
              Item Description
            </Text>
            <Text style={{ width: "70%", ...styles.cell2 }}>
              {data?.itemDescription}
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell2 }}>Qty</Text>
            <Text style={{ width: "70%", ...styles.cell2 }}>
              {data?.quantity}
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell2 }}>Process</Text>
            <Text style={{ width: "70%", ...styles.cell2 }}>
              {data?.processName}
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell2 }}>
              Testing Instrument with ID No
            </Text>
            <Text style={{ width: "70%", ...styles.cell2 }}>
              {data?.testingInstrumentId}
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell2 }}>
              Manufacturing Equipment With ID No.
            </Text>
            <Text style={{ width: "70%", ...styles.cell2 }}>
              {data?.manufacturingEquipment}
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell2 }}>Material</Text>
            <Text style={{ width: "70%", ...styles.cell2 }}>
              {data?.material}
            </Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "100%", ...styles.cell3 }}>Result</Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "10%", ...styles.cell3 }}>Sr.No</Text>
            <Text style={{ width: "15%", ...styles.cell3 }}>Heat No.</Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>Item</Text>
            <Text style={{ width: "15%", ...styles.cell3 }}>Qty</Text>
            <Text style={{ width: "15%", ...styles.cell3 }}>
              Required (Hardness)HRB
            </Text>
            <Text style={{ width: "15%", ...styles.cell3 }}>Achieved</Text>
          </View>

          <View style={styles.header}>
            <Text style={{ width: "10%", ...styles.cell3 }}>1</Text>
            <Text style={{ width: "15%", ...styles.cell3 }}>
              {data?.heatNo}
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.itemDescription}
            </Text>
            <Text style={{ width: "15%", ...styles.cell3 }}>
              {data?.quantity}
            </Text>
            <Text style={{ width: "15%", ...styles.cell3 }}>
              {data?.requiredHardness}
            </Text>
            <Text style={{ width: "15%", ...styles.cell3 }}>
              {data?.achieved}
            </Text>
          </View>

          <View style={{ margin: 10 }}></View>

          <Text>Note:</Text>
          <Text>Hardening Process: {data?.hardeningProcessNot} </Text>
          <Text>Tempering Process: {data?.temperingProcessNot} </Text>

          <View style={{ margin: 10 }}></View>
          <Text>Heat Treatment Chart or Photo </Text>
          {/* Images */}
          {data.selectedImages && data.selectedImages.length > 0 && (
            <View style={{ ...styles.imageContainer, width: '100%' }}>
              {data.selectedImages.map((image, index) => (
                <Image
                  key={index}
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${image.path}`}
                  style={styles.image}
                />
              ))}
            </View>
          )}
          <View style={{ margin: 10 }}></View>

          <Text>Approved By :</Text>
          <View style={{ margin: 10 }}></View>
          <Text>Name :</Text>
          <View style={{ margin: 5 }}></View>
          <Text>Sign :</Text>
          <View style={{ margin: 5 }}></View>
          <Text>Designation :</Text>
        </View>
      </Page>
    </Document>
  );
};

export default HeatTreatmentReport;
