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
import ProductionPlanMain from "./ProductionPlanMain.jsx";
import formatDate from "../utils/formatDate.js";

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

// Data for the table
const tableData = [
  {
    _id: "66229641f97297cba88eee3d",
    productionSheetName: "Stud - Akshay55",
    itemDescription: "Stud",
    materialIssue: "B7",
    requiredResources: "List Of M/C-F-MN-04, List Of Employees HR-04",
    productAndCustomer:
      "Cuttingsize: diameter - 92.3, Pitch - 8, length - 25.955",
    legalAndApplicable: "Lis Of Statutory & Regulatory - F-HR-01",
    contingencyPlanning: "P-QMS-03",
    verification: "As Per ITPYour verification data",
    validation: "As Per ITP",
    monitoring: "As Per ITP",
    measurement: "As Per ITP",
    inspection: "As Per ITP",
    management: "N/A",
    recordsEvidence: "Final MTC - F-QC-10",
    planningQuantity: "30",
    planningDate: "2024-05-15T16:05:21.852Z",
    achievementQuantity: "30",
    selectedItem: "studwith2nuts",
    achievementDate: "2024-05-17T16:05:21.852Z",
    deliveryDate: "2024-05-20T16:05:21.852Z",
    orderDate: "2024-04-19T16:05:21.852Z",
    attachment: "Your attachment data",
    poNo: "PO5555",
    __v: 0,
  },
  {
    _id: "66229641f97297cba88eee3f",
    productionSheetName: "Nut - Akshay55",
    itemDescription: "2 Nut",
    materialIssue: "2H",
    requiredResources: "List Of M/C-F-MN-04, List Of Employees HR-04",
    productAndCustomer:
      "Cuttingsize: diameter - 92.3, Pitch - 8, length - 25.955",
    legalAndApplicable: "Lis Of Statutory & Regulatory - F-HR-01",
    contingencyPlanning: "P-QMS-03",
    verification: "As Per ITPYour verification data",
    validation: "As Per ITP",
    monitoring: "As Per ITP",
    measurement: "As Per ITP",
    inspection: "As Per ITP",
    management: "N/A",
    recordsEvidence: "Final MTC - F-QC-10",
    planningQuantity: "60",
    planningDate: "2024-05-15T16:05:21.852Z",
    achievementQuantity: "60",
    selectedItem: "studwith2nuts",
    achievementDate: "2024-05-17T16:05:21.852Z",
    deliveryDate: "2024-05-20T16:05:21.852Z",
    orderDate: "2024-04-19T16:05:21.852Z",
    attachment: "Your attachment data",
    poNo: "PO5555",
    __v: 0,
  },
];

// Main component to render the PDF
const ProductionPlanning = ({ data }) => (
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
          <Text style={styles.cell1}>Production Planning</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.cell2}>Production Planning Number:PPN001</Text>
          <Text style={styles.cell2}>SO_NO:SO001 </Text>
        </View>
        <View style={styles.header}>
          <Text style={{ width: "30px", ...styles.cell3 }}>SR. No.</Text>
          <Text style={{ width: "200px", ...styles.cell3 }}>Points</Text>
          <Text style={{ width: "171px", ...styles.cell3 }}>
            Specification / Records / Document
          </Text>
          <View style={styles.nestedCell}>
            <Text style={{ width: "200px", ...styles.cell3 }}>Planning</Text>
            <View style={styles.rightSide}>
              <Text style={{ width: "100px", ...styles.cell3 }}>Date</Text>
              <Text style={{ width: "100px", ...styles.cell3 }}>Quantity</Text>
            </View>
          </View>
          <View style={styles.nestedCell}>
            <Text style={{ width: "200px", ...styles.cell3 }}>Achievement</Text>
            <View style={styles.rightSide}>
              <Text style={{ width: "100px", ...styles.cell3 }}>Date</Text>
              <Text style={{ width: "100px", ...styles.cell3 }}>Quantity</Text>
            </View>
          </View>
        </View>

        <View wrap>
          <ProductionPlanMain
            srNo={1}
            points={"Item Description"}
            specs={data?.itemDescription}
            planningDate={formatDate(data?.planningDate)}
            planningQty={data?.planningQuantity}
            achievementDate={formatDate(data?.achievementDate)}
            achievementQty={data?.achievementQuantity}
          />

          <ProductionPlanMain
            srNo={2}
            points={"Size"}
            specs={data?.productAndCustomer}
          />

          <ProductionPlanMain
            srNo={3}
            points={"Material Grade"}
            specs={data?.materialIssue}
          />

          <ProductionPlanMain
            srNo={4}
            points={"Qty"}
            specs={data?.planningQuantity}
            planningDate={formatDate(data?.planningDate)}
            planningQty={data?.planningQuantity}
            achievementDate={formatDate(data?.achievementDate)}
            achievementQty={data?.achievementQuantity}
          />

          <ProductionPlanMain
            srNo={5}
            points={"Required resources and work environment management"}
            specs={data?.requiredResources}
            planningDate={formatDate(data?.planningDate)}
            planningQty={data?.planningQuantity}
            achievementDate={formatDate(data?.achievementDate)}
            achievementQty={data?.achievementQuantity}
          />

          <ProductionPlanMain
            srNo={6}
            points={"Product and customer-specified requirements"}
            specs={data?.productAndCustomer}
            planningDate={formatDate(data?.planningDate)}
            planningQty={data?.planningQuantity}
            achievementDate={formatDate(data?.achievementDate)}
            achievementQty={data?.achievementQuantity}
          />

          <ProductionPlanMain
            srNo={7}
            points={"Legal and other applicable requirements"}
            specs={data?.legalAndApplicable}
            planningDate={formatDate(data?.planningDate)}
            planningQty={data?.planningQuantity}
            achievementDate={formatDate(data?.achievementDate)}
            achievementQty={data?.achievementQuantity}
          />

          <ProductionPlanMain
            srNo={8}
            points={"Contingency planning"}
            specs={data?.contingencyPlanning}
            planningDate={formatDate(data?.planningDate)}
            planningQty={data?.planningQuantity}
            achievementDate={formatDate(data?.achievementDate)}
            achievementQty={data?.achievementQuantity}
          />

          <ProductionPlanMain
            srNo={9}
            points={"Verification"}
            specs={data?.verification}
            planningDate={formatDate(data?.planningDate)}
            planningQty={data?.planningQuantity}
            achievementDate={formatDate(data?.achievementDate)}
            achievementQty={data?.achievementQuantity}
          />

          <ProductionPlanMain
            srNo={10}
            points={"Validation"}
            specs={data?.validation}
            planningDate={formatDate(data?.planningDate)}
            planningQty={data?.planningQuantity}
            achievementDate={formatDate(data?.achievementDate)}
            achievementQty={data?.achievementQuantity}
          />

          <ProductionPlanMain
            srNo={11}
            points={"Monitoring"}
            specs={data?.monitoring}
            planningDate={formatDate(data?.planningDate)}
            planningQty={data?.planningQuantity}
            achievementDate={formatDate(data?.achievementDate)}
            achievementQty={data?.achievementQuantity}
          />

          <ProductionPlanMain
            srNo={12}
            points={"Measurement"}
            specs={data?.measurement}
            planningDate={formatDate(data?.planningDate)}
            planningQty={data?.planningQuantity}
            achievementDate={formatDate(data?.achievementDate)}
            achievementQty={data?.achievementQuantity}
          />

          <ProductionPlanMain
            srNo={13}
            points={
              "Inspection, and test activities specific to the product and the criteria for product acceptance"
            }
            specs={data?.inspection}
            planningDate={formatDate(data?.planningDate)}
            planningQty={data?.planningQuantity}
            achievementDate={formatDate(data?.achievementDate)}
            achievementQty={data?.achievementQuantity}
          />

          <ProductionPlanMain
            srNo={14}
            points={"Management of Change (MOC)"}
            specs={data?.management}
            planningDate={formatDate(data?.planningDate)}
            planningQty={data?.planningQuantity}
            achievementDate={formatDate(data?.achievementDate)}
            achievementQty={data?.achievementQuantity}
          />

          <ProductionPlanMain
            srNo={15}
            points={
              "Records needed to provide evidence that product realization conforms to requirements"
            }
            specs={data?.recordsEvidence}
            planningDate={formatDate(data?.planningDate)}
            planningQty={data?.planningQuantity}
            achievementDate={formatDate(data?.achievementDate)}
            achievementQty={data?.achievementQuantity}
          />
        </View>
        <View style={styles.footer} fixed>
          <Text style={{ ...styles.cellFooter }} fixed>
            Prepared by:
          </Text>
          <Text style={{ ...styles.cellFooter }} fixed>
            Approved by:
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default ProductionPlanning;
