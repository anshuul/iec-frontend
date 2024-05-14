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
import formatDate from "../utils/formatDate";
import RoutingSheetNutMain from "./RoutingSheetMain.jsx";

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
    _id: "66264c402be31d21b5387343",
    poNo: "PO109",
    date: "2024-04-22T11:38:40.542Z",
    processRows: [
      {
        operatorName: "VIMAL INDUSTRY",
        machineNo: "-",
        jobDescription: "Stud - Ultrasonic Testing",
        procedures: "Stud - GRN",
        orderQty: 300,
        processQty: 300,
        startTime: "0",
        endTime: "0",
        remarks: "-",
        _id: "66264c402be31d21b5387373",
      },
      {
        operatorName: "BISWAJIT",
        machineNo: "-",
        jobDescription: "Stud - Material Issue",
        procedures: "Stud - MIS",
        orderQty: 1426.53,
        processQty: 1426.53,
        startTime: "0",
        endTime: "0",
        remarks: "-",
        _id: "66264c402be31d21b5387374",
      },
      {
        operatorName: "RAMLAKAN",
        machineNo: "IEC-M/C-01",
        jobDescription: "Stud - Cutting",
        procedures: "Stud - IEC/SOP/01",
        orderQty: 300,
        processQty: 300,
        startTime: "05/02/24, 09:30 AM",
        endTime: "05/03/24, 01:30 PM",
        remarks: "-",
        _id: "66264c402be31d21b5387375",
      },
      {
        operatorName: "AJAY MISHRA",
        machineNo: "IEC-M/C-02",
        jobDescription: "Stud - Machining",
        procedures: "Stud - IEC/SOP/09",
        orderQty: 300,
        processQty: 300,
        startTime: "05/02/24, 10:40 AM",
        endTime: "05/03/24, 02:30 PM",
        remarks: "-",
        _id: "66264c402be31d21b5387376",
      },
      {
        operatorName: "AMIT",
        machineNo: "IEC-M/C-03",
        jobDescription: "Stud - Punching",
        procedures: "Stud - IEC/SOP/43",
        orderQty: 300,
        processQty: 300,
        startTime: "05/02/24, 11:50 AM",
        endTime: "05/03/24, 02:31 PM",
        remarks: "-",
        _id: "66264c402be31d21b5387377",
      },
      {
        operatorName: "SITARAM",
        machineNo: "IEC-M/C-08",
        jobDescription: "Stud - Grinding",
        procedures: "Stud - IEC/SOP/16",
        orderQty: 300,
        processQty: 300,
        startTime: "05/02/24, 12:07 PM",
        endTime: "05/03/24, 05:28 AM",
        remarks: "-",
        _id: "66264c402be31d21b5387378",
      },
      {
        operatorName: "AJAY JAISWAL",
        machineNo: "IEC-M/C-05",
        jobDescription: "Stud - Threading",
        procedures: "Stud - IEC/SOP/20",
        orderQty: 300,
        processQty: 300,
        startTime: "05/02/24, 12:54 PM",
        endTime: "05/03/24, 03:49 PM",
        remarks: "-",
        _id: "66264c402be31d21b5387379",
      },
      {
        operatorName: "ROBERT",
        machineNo: "IEC-M/C-04",
        jobDescription: "Stud - Heating",
        procedures: "Stud - IEC/SOP/27",
        orderQty: 300,
        processQty: 300,
        startTime: "0",
        endTime: "0",
        remarks: "-",
        _id: "66264c402be31d21b538737a",
      },
      {
        operatorName: "AJAY JAISWAL",
        machineNo: "IEC-M/C-05",
        jobDescription: "Stud - Hardness",
        procedures: "Stud - IEC/SOP/34",
        orderQty: 300,
        processQty: 300,
        startTime: "0",
        endTime: "0",
        remarks: "-",
        _id: "66264c402be31d21b538737b",
      },
      {
        operatorName: "AKHIL KHAN",
        machineNo: "IEC-M/C-10",
        jobDescription: "Stud - Phosphating",
        procedures: "Stud - IEC/SOP/32",
        orderQty: 300,
        processQty: 300,
        startTime: "05/02/24, 02:04 PM",
        endTime: "05/03/24, 02:04 AM",
        remarks: "-",
        _id: "66264c402be31d21b538737c",
      },
      {
        operatorName: "GAURISHANKAR",
        machineNo: "IEC-M/C-11",
        jobDescription: "Stud - Buffing",
        procedures: "Stud - IEC/SOP/31",
        orderQty: 300,
        processQty: 300,
        startTime: "05/02/24, 03:14 PM",
        endTime: "05/05/24, 03:14 PM",
        remarks: "-",
        _id: "66264c402be31d21b538737d",
      },
      {
        operatorName: "SONU/ISRAR",
        machineNo: "IEC-M/C-12",
        jobDescription: "Stud - MPI",
        procedures: "Stud - IEC/SOP/40",
        orderQty: 300,
        processQty: 300,
        startTime: "05/02/24, 04:24 PM",
        endTime: "05/05/24, 04:24 PM",
        remarks: "-",
        _id: "66264c402be31d21b538737e",
      },
      {
        operatorName: "SONU/ISRAR",
        machineNo: "IEC-M/C-13",
        jobDescription: "Stud - LPT",
        procedures: "Stud - IEC/SOP/38",
        orderQty: 300,
        processQty: 300,
        startTime: "05/02/24, 05:34 PM",
        endTime: "05/07/24, 05:34 PM",
        remarks: "-",
        _id: "66264c402be31d21b538737f",
      },
      {
        operatorName: "POLYMECH",
        machineNo: "-",
        jobDescription: "Stud - Coating",
        procedures: "Stud - ",
        orderQty: 300,
        processQty: 300,
        startTime: "05/03/24, 09:30 AM",
        endTime: "05/05/24, 09:30 AM",
        remarks: "-",
        _id: "66264c402be31d21b5387380",
      },
      {
        operatorName: "PINANK PATEL",
        machineNo: "-",
        jobDescription: "Stud - QC Inspection",
        procedures: "Stud - ",
        orderQty: 300,
        processQty: 300,
        startTime: "05/04/24, 09:30 AM",
        endTime: "05/06/24, 09:30 AM",
        remarks: "-",
        _id: "66264c402be31d21b5387381",
      },
      {
        operatorName: "SONU/ISRA",
        machineNo: "-",
        jobDescription: "Stud - Packing",
        procedures: "Stud - IEC/SOP/45",
        orderQty: 300,
        processQty: 300,
        startTime: "0",
        endTime: "0",
        remarks: "-",
        _id: "66264c402be31d21b5387382",
      },
      {
        operatorName: "SONU/ISRA",
        machineNo: "-",
        jobDescription: "Stud - Dispatch",
        procedures: "Stud - IEC/SOP/45",
        orderQty: 300,
        processQty: 300,
        startTime: "0",
        endTime: "0",
        remarks: "-",
        _id: "66264c402be31d21b5387383",
      },
    ],
    __v: 0,
  },
];

const RoutingSheetStud = ({ data }) => {
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
            <Text style={styles.cell1}>Routing Sheet</Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "100px", ...styles.cell3 }}>SO No</Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>Empty</Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>SO Date</Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>Empty</Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>
              Delivery Date
            </Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>C-PO</Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>Qty</Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>C-PO</Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "100px", ...styles.cell3 }}>Item Name </Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>
              Stud – Stud Nut- Nut (Type)
            </Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>ITP No.</Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>Empty</Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>ITP Rev No.</Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>Empty</Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>Heat No</Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>Empty</Text>
          </View>
          <View style={styles.header}>
            <View style={styles.nestedCell}>
              <Text style={{ width: "100px", ...styles.cell3 }}>Size</Text>
              <Text style={{ width: "100px", ...styles.cell3 }}>Material</Text>
            </View>
            <View style={styles.nestedCell}>
              <Text style={{ width: "100px", ...styles.cell3 }}>C-PO</Text>
              <Text style={{ width: "100px", ...styles.cell3 }}>Empty</Text>
            </View>
            <View style={styles.nestedCell}>
              <Text style={{ width: "100px", ...styles.cell3 }}>
                Drawing No
              </Text>
              <Text style={{ width: "100px", ...styles.cell3 }}>Grade</Text>
            </View>
            <View style={styles.nestedCell}>
              <Text style={{ width: "100px", ...styles.cell3 }}>Empty</Text>
              <Text style={{ width: "100px", ...styles.cell3 }}>C-PO</Text>
            </View>
            <Text style={{ width: "100px", ...styles.cell3 }}>
              Drg Rev. No.
            </Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>Empty</Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>
              Coating Type & Colour{" "}
            </Text>
            <Text style={{ width: "100px", ...styles.cell3 }}>C-PO</Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "30px", ...styles.cell3 }}>Sr. No</Text>
            <Text style={{ width: "70px", ...styles.cell3 }}>Date</Text>
            <Text style={{ width: "70px", ...styles.cell3 }}>
              Operator Name / Supplier
            </Text>
            <Text style={{ width: "70px", ...styles.cell3 }}>
              Machine No. / Instrument No.
            </Text>
            <Text style={{ width: "70px", ...styles.cell3 }}>
              Process Description
            </Text>
            <Text style={{ width: "70px", ...styles.cell3 }}>
              Procedure No./ Drawing No./ Report No.
            </Text>
            <Text style={{ width: "70px", ...styles.cell3 }}>Order Qty</Text>
            <Text style={{ width: "70px", ...styles.cell3 }}>Process Qty</Text>
            <Text style={{ width: "70px", ...styles.cell3 }}>Start Date</Text>
            <Text style={{ width: "70px", ...styles.cell3 }}>End Date</Text>
            <Text style={{ width: "70px", ...styles.cell3 }}>Opt. Sign</Text>
            <Text style={{ width: "70px", ...styles.cell3 }}>Remarks</Text>
          </View>
          {/* <RoutingSheetNutMain
            srNo={1}
            operatorName={tableData.routingSheet.processRows[0].operatorName}
            machineNo={tableData.routingSheet.processRows[0].machineNo}
            processDescription={
              tableData.routingSheet.processRows[0].processDescription
            }
            procedureNo={tableData.routingSheet.processRows[0].procedureNo}
            orderQuantity={tableData.routingSheet.processRows[0].orderQty}
            processQuantity={tableData.routingSheet.processRows[0].processQty}
            startDate={tableData.routingSheet.processRows[0].startTime}
            endDate={tableData.routingSheet.processRows[0].endTime}
          /> */}
          {data?.map((ele, i) => (
            <View wrap>
              <RoutingSheetNutMain
                srNo={ele.processRowNumber}
                date={ele.startTime}
                operatorName={ele.operatorName}
                machineNo={ele.machineNo}
                processDescription={ele.processDescription}
                procedureNo={ele.procedureNo}
                orderQuantity={ele.orderQty}
                processQuantity={ele.processQty}
                startDate={ele.startTime}
                endDate={ele.endTime}
              />
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default RoutingSheetStud;
