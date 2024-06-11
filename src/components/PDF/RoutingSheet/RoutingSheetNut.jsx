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
import RoutingSheetMain from "./RoutingSheetMain.jsx";

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

const tableData = {
  productionReports: [
    {
      _id: "6625196a68281c1bbcd1ee3d",
      poNo: "PO156",
      date: "2024-04-21T13:49:30.581Z",
      routingSheetIds: ["6625196a68281c1bbcd1edc5"],
      processRows: [
        {
          operatorName: "VIMAL INDUSTRY",
          machineNo: "-",
          jobDescription: "Nut - Ultrasonic Testing",
          procedures: "Nut - GRN",
          orderQty: 400,
          processQty: 400,
          startTime: "0",
          endTime: "0",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee3e",
        },
        {
          operatorName: "BISWAJIT",
          machineNo: "-",
          jobDescription: "Nut - Material Issue",
          procedures: "Nut - MIS",
          orderQty: 4312.233,
          processQty: 4312.233,
          startTime: "0",
          endTime: "0",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee3f",
        },
        {
          operatorName: "RAMLAKAN",
          machineNo: "IEC-M/C-01",
          jobDescription: "Nut - Cutting",
          procedures: "Nut - IEC/SOP/01",
          orderQty: 400,
          processQty: 400,
          startTime: "01/05/24, 09:30 am",
          endTime: "05/05/24, 03:30 pm",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee40",
        },
        {
          operatorName: "SURESH PRAJAPATI",
          machineNo: "IEC-M/C-07",
          jobDescription: "Nut - Forging",
          procedures: "Nut - IEC/SOP/17",
          orderQty: 400,
          processQty: 400,
          startTime: "01/05/24, 10:40 am",
          endTime: "03/05/24, 02:40 am",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee41",
        },
        {
          operatorName: "AJAY MISHRA",
          machineNo: "IEC-M/C-02",
          jobDescription: "Nut - Machining",
          procedures: "Nut - IEC/SOP/09",
          orderQty: 400,
          processQty: 400,
          startTime: "01/05/24, 10:40 am",
          endTime: "05/05/24, 04:02 pm",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee42",
        },
        {
          operatorName: "AMIT",
          machineNo: "IEC-M/C-03",
          jobDescription: "Nut - Punching/Marking",
          procedures: "Nut - IEC/SOP/43",
          orderQty: 400,
          processQty: 400,
          startTime: "01/05/24, 11:50 am",
          endTime: "02/05/24, 10:00 am",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee43",
        },
        {
          operatorName: "AJAY JAISWAL",
          machineNo: "IEC-M/C-05",
          jobDescription: "Nut - Threading",
          procedures: "Nut - IEC/SOP/20",
          orderQty: 400,
          processQty: 400,
          startTime: "01/05/24, 12:25 pm",
          endTime: "04/05/24, 11:52 am",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee44",
        },
        {
          operatorName: "ROBERT",
          machineNo: "IEC-M/C-04",
          jobDescription: "Nut - Heat treatment / stress reliving",
          procedures: "Nut - IEC/SOP/27",
          orderQty: 400,
          processQty: 400,
          startTime: "0",
          endTime: "0",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee45",
        },
        {
          operatorName: "AJAY JAISWAL",
          machineNo: "IEC-M/C-09",
          jobDescription: "Nut - Hardness",
          procedures: "Nut - IEC/SOP/34",
          orderQty: 400,
          processQty: 400,
          startTime: "0",
          endTime: "0",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee46",
        },
        {
          operatorName: "AKHIL KHAN",
          machineNo: "IEC-M/C-10",
          jobDescription: "Nut - Phosphating",
          procedures: "Nut - IEC/SOP/32",
          orderQty: 400,
          processQty: 400,
          startTime: "0",
          endTime: "0",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee47",
        },
        {
          operatorName: "GAURISHANKAR",
          machineNo: "IEC-M/C-11",
          jobDescription: "Nut - Buffing",
          procedures: "Nut - IEC/SOP/31",
          orderQty: 400,
          processQty: 400,
          startTime: "0",
          endTime: "0",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee48",
        },
        {
          operatorName: "SONU/ISRAR",
          machineNo: "IEC-M/C-12",
          jobDescription: "Nut - MPI",
          procedures: "Nut - IEC/SOP/40",
          orderQty: 400,
          processQty: 400,
          startTime: "0",
          endTime: "0",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee49",
        },
        {
          operatorName: "SONU/ISRAR",
          machineNo: "IEC-M/C-13",
          jobDescription: "Nut - LPT",
          procedures: "Nut - IEC/SOP/38",
          orderQty: 400,
          processQty: 400,
          startTime: "0",
          endTime: "0",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee4a",
        },
        {
          operatorName: "POLYMECH",
          machineNo: "-",
          jobDescription: "Nut - Coating",
          procedures: "Nut - ",
          orderQty: 400,
          processQty: 400,
          startTime: "0",
          endTime: "0",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee4b",
        },
        {
          operatorName: "PINANK PATEL",
          machineNo: "-",
          jobDescription: "Nut - QC Inspection",
          procedures: "Nut - ",
          orderQty: 400,
          processQty: 400,
          startTime: "0",
          endTime: "0",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee4c",
        },
        {
          operatorName: "SONU/ISRA",
          machineNo: "-",
          jobDescription: "Nut - Packing",
          procedures: "Nut - IEC/SOP/45",
          orderQty: 400,
          processQty: 400,
          startTime: "0",
          endTime: "0",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee4d",
        },
        {
          operatorName: "SONU/ISRA",
          machineNo: "-",
          jobDescription: "Nut - Dispatch",
          procedures: "Nut - IEC/SOP/45",
          orderQty: 400,
          processQty: 400,
          startTime: "0",
          endTime: "0",
          remarks: "-",
          _id: "6625196a68281c1bbcd1ee4e",
        },
      ],
      __v: 0,
    },
  ],
  routingSheet: {
    _id: "6625196a68281c1bbcd1edc5",
    poNo: "PO156",
    date: "2024-04-21T13:49:30.380Z",
    processRows: [
      {
        routingSheetNo: "Nut - 1",
        operatorName: "VIMAL INDUSTRY",
        machineNo: "-",
        processDescription: "Ultrasonic Testing",
        procedureNo: "GRN",
        orderQty: 400,
        processQty: 400,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 1,
        _id: "6625196a68281c1bbcd1edc6",
      },
      {
        routingSheetNo: "Nut - 2",
        operatorName: "BISWAJIT",
        machineNo: "-",
        processDescription: "Material Issue",
        procedureNo: "MIS",
        orderQty: 4312.233,
        processQty: 4312.233,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 2,
        _id: "6625196a68281c1bbcd1edc7",
      },
      {
        routingSheetNo: "Nut - 3",
        operatorName: "RAMLAKAN",
        machineNo: "IEC-M/C-01",
        processDescription: "Cutting",
        procedureNo: "IEC/SOP/01",
        orderQty: 400,
        processQty: 400,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 3,
        _id: "6625196a68281c1bbcd1edc8",
      },
      {
        routingSheetNo: "Nut - 4",
        operatorName: "AJAY MISHRA",
        machineNo: "IEC-M/C-02",
        processDescription: "Forging",
        procedureNo: "IEC/SOP/09",
        orderQty: 400,
        processQty: 400,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 4,
        _id: "6625196a68281c1bbcd1edc9",
      },
      {
        routingSheetNo: "Nut - 5",
        operatorName: "Default Operator",
        machineNo: "-",
        processDescription: "Machining",
        procedureNo: "-",
        orderQty: 400,
        processQty: 400,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 5,
        _id: "6625196a68281c1bbcd1edca",
      },
      {
        routingSheetNo: "Nut - 6",
        operatorName: "Default Operator",
        machineNo: "-",
        processDescription: "Punching/Marking",
        procedureNo: "-",
        orderQty: 400,
        processQty: 400,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 6,
        _id: "6625196a68281c1bbcd1edcb",
      },
      {
        routingSheetNo: "Nut - 7",
        operatorName: "AJAY JAISWAL",
        machineNo: "IEC-M/C-05",
        processDescription: "Threading",
        procedureNo: "IEC/SOP/20",
        orderQty: 400,
        processQty: 400,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 7,
        _id: "6625196a68281c1bbcd1edcc",
      },
      {
        routingSheetNo: "Nut - 8",
        operatorName: "Default Operator",
        machineNo: "-",
        processDescription: "Heat treatment / stress reliving",
        procedureNo: "-",
        orderQty: 400,
        processQty: 400,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 8,
        _id: "6625196a68281c1bbcd1edcd",
      },
      {
        routingSheetNo: "Nut - 9",
        operatorName: "AJAY JAISWAL",
        machineNo: "IEC-M/C-09",
        processDescription: "Hardness",
        procedureNo: "IEC/SOP/34",
        orderQty: 400,
        processQty: 400,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 9,
        _id: "6625196a68281c1bbcd1edce",
      },
      {
        routingSheetNo: "Nut - 10",
        operatorName: "AKHIL KHAN",
        machineNo: "IEC-M/C-10",
        processDescription: "Phosphating",
        procedureNo: "IEC/SOP/32",
        orderQty: 400,
        processQty: 400,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 10,
        _id: "6625196a68281c1bbcd1edcf",
      },
      {
        routingSheetNo: "Nut - 11",
        operatorName: "GAURISHANKAR",
        machineNo: "IEC-M/C-11",
        processDescription: "Buffing",
        procedureNo: "IEC/SOP/31",
        orderQty: 400,
        processQty: 400,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 11,
        _id: "6625196a68281c1bbcd1edd0",
      },
      {
        routingSheetNo: "Nut - 12",
        operatorName: "SONU/ISRAR",
        machineNo: "IEC-M/C-12",
        processDescription: "MPI",
        procedureNo: "IEC/SOP/40",
        orderQty: 400,
        processQty: 400,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 12,
        _id: "6625196a68281c1bbcd1edd1",
      },
      {
        routingSheetNo: "Nut - 13",
        operatorName: "SONU/ISRAR",
        machineNo: "IEC-M/C-13",
        processDescription: "LPT",
        procedureNo: "IEC/SOP/38",
        orderQty: 400,
        processQty: 400,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 13,
        _id: "6625196a68281c1bbcd1edd2",
      },
      {
        routingSheetNo: "Nut - 14",
        operatorName: "POLYMECH",
        machineNo: "-",
        processDescription: "Coating",
        procedureNo: "-",
        orderQty: 400,
        processQty: 400,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 14,
        _id: "6625196a68281c1bbcd1edd3",
      },
      {
        routingSheetNo: "Nut - 15",
        operatorName: "PINANK PATEL",
        machineNo: "-",
        processDescription: "QC Inspection",
        procedureNo: "-",
        orderQty: 400,
        processQty: 400,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 15,
        _id: "6625196a68281c1bbcd1edd4",
      },
      {
        routingSheetNo: "Nut - 16",
        operatorName: "SONU/ISRA",
        machineNo: "-",
        processDescription: "Packing",
        procedureNo: "IEC/SOP/45",
        orderQty: 400,
        processQty: 400,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 16,
        _id: "6625196a68281c1bbcd1edd5",
      },
      {
        routingSheetNo: "Nut - 17",
        operatorName: "SONU/ISRA",
        machineNo: "-",
        processDescription: "Dispatch",
        procedureNo: "IEC/SOP/45",
        orderQty: 400,
        processQty: 400,
        startTime: 0,
        endTime: 0,
        optSign: "-",
        remarks: "-",
        routingSheetNumber: 2,
        processRowNumber: 17,
        _id: "6625196a68281c1bbcd1edd6",
      },
    ],
    __v: 0,
  },
};

const RoutingSheetNut = () => {
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
          {data?.processRows.map((ele) => (
            <View wrap>
              <RoutingSheetMain
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

export default RoutingSheetNut;
