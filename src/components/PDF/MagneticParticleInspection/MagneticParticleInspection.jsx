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

const MagneticParticleInspection = ({ data }) => {
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
              Magnetic Particle Inspection Report (MPI)
            </Text>
          </View>
          <View style={styles.header} fixed>
            <Text style={{ width: "350px", ...styles.cell3 }}>
              MPIR No : {data?.mpirNo}
            </Text>
            <Text style={{ width: "350px", ...styles.cell3 }}>
              Date : {formatDate(data?.date.toString())}
            </Text>
          </View>
          <View style={{ margin: 3 }} fixed></View>
          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell3 }}>Product Name</Text>
            <Text style={{ width: "35%", ...styles.cell3 }}>
              {data?.productName}
            </Text>
            <Text style={{ width: "20%", ...styles.cell3 }}>Drawing No</Text>
            <Text style={{ width: "15%", ...styles.cell3 }}>
              {data?.drawingNo}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell3 }}>Qty</Text>
            <Text style={{ width: "35%", ...styles.cell3 }}>
              {data?.quantity}
            </Text>
            <Text style={{ width: "20%", ...styles.cell3 }}>Material Type</Text>
            <Text style={{ width: "15%", ...styles.cell3 }}>
              {data?.materialType}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "30%", ...styles.cell3 }}>Q A No</Text>
            <Text style={{ width: "35%", ...styles.cell3 }}>{data?.qaNO}</Text>
            <Text style={{ width: "20%", ...styles.cell3 }}></Text>
            <Text style={{ width: "15%", ...styles.cell3 }}></Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              Magnetic Particle Inspection Procedure No.
            </Text>
            <Text style={{ width: "25%", ...styles.cell3 }}>{data?.mpiNo}</Text>
            <Text style={{ width: "25%", ...styles.cell3 }}>Heat No</Text>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              {data?.heatNo}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              Acceptance Standard
            </Text>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              {data?.acceptanceStandard}
            </Text>
            <Text style={{ width: "25%", ...styles.cell3 }}>Material</Text>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              {data?.material}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              Material Specification
            </Text>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              {data?.materialSpecification}
            </Text>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              Surface Condition
            </Text>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              {data?.surfaceCondition}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              Test Temperature
            </Text>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              {data?.testTemperature}
            </Text>
            <Text style={{ width: "25%", ...styles.cell3 }}>Illumination</Text>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              {data?.illumination}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              Equipment Name & Sr. No
            </Text>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              {data?.equipmentName}
            </Text>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              Illumination Location
            </Text>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              {data?.illuminationLocation}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "25%", ...styles.cell3 }}>Technique</Text>
            <Text style={{ width: "25%", ...styles.cell3 }}>
              {data?.technique}
            </Text>
            <Text style={{ width: "25%", ...styles.cell3 }}></Text>
            <Text style={{ width: "25%", ...styles.cell3 }}></Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "25%", ...styles.cell3 }}>Test weight</Text>
            <Text style={{ width: "15%", ...styles.cell3 }}>
              {data?.testweight}
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              Magnetizing Process
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.selectedMagnetizingProcess}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "13.5%", ...styles.cell3 }}>Consumables</Text>
            <Text style={{ width: "13.5%", ...styles.cell3 }}>Make / Type</Text>
            <Text style={{ width: "13.5%", ...styles.cell3 }}>
              Lot No / Batch No
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              Magnetizing Current
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.selectedMagnetizingCurrent}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "13.5%", ...styles.cell3 }}>
              White Contrast Paint
            </Text>
            <Text style={{ width: "13.5%", ...styles.cell3 }}>
              {data?.whiteContrastPaintMakeType}
            </Text>
            <Text style={{ width: "13.5%", ...styles.cell3 }}>
              {data?.whiteContrastPaintLotNo}
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>Magnetizing</Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.selectedMagnetizing}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "13.5%", ...styles.cell3 }}>
              Black Magnetic ink
            </Text>
            <Text style={{ width: "13.5%", ...styles.cell3 }}>
              {data?.blackMagneticInkMakeType}
            </Text>
            <Text style={{ width: "13.5%", ...styles.cell3 }}>
              {data?.blackMagneticInkLotNo}
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>Method</Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.selectedMethod}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "13.5%", ...styles.cell3 }}>
              Wet Fluorescent
            </Text>
            <Text style={{ width: "13.5%", ...styles.cell3 }}>
              {data?.wetFluorescentMakeType}
            </Text>
            <Text style={{ width: "13.5%", ...styles.cell3 }}>
              {data?.wetFluorescentLotNo}
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              Magnetic Field Indicator
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.magneticFieldIndicator}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "13.5%", ...styles.cell3 }}>Dry Powder</Text>
            <Text style={{ width: "13.5%", ...styles.cell3 }}>
              {data?.dryPowderMakeType}
            </Text>
            <Text style={{ width: "13.5%", ...styles.cell3 }}>
              {data?.dryPowderLotNo}
            </Text>
            <View style={{ width: "60%", ...styles.nestedCell }}>
              <View style={styles.header}>
                <Text style={{ width: "100%", ...styles.cell3 }}>
                  Black Light Intensity
                </Text>
                <Text style={{ width: "100%", ...styles.cell3 }}>
                  {data?.blackLightIntensity}
                </Text>
              </View>
              <View style={styles.header}>
                <Text style={{ width: "100%", ...styles.cell3 }}>
                  Demagnetization
                </Text>
                <Text style={{ width: "100%", ...styles.cell3 }}>
                  {data?.selectedDemagnetization}
                </Text>
              </View>
              <View style={styles.header}>
                <Text style={{ width: "100%", ...styles.cell3 }}>
                  Powder Concertation
                </Text>
                <Text style={{ width: "100%", ...styles.cell3 }}>
                  {data?.powderConcertation}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "25%", ...styles.cell3 }}>Scope of Work</Text>
            <Text style={{ width: "75%", ...styles.cell3 }}>
              {data?.scopeOfWork}
            </Text>
          </View>
          <View style={{ margin: 3 }}></View>

          {/* <View style={styles.imageContainer}> */}
          <View style={{ ...styles.imageContainer, width: '100%' }}>
            {data.selectedImages.map((image, index) => (
              <Image
                key={index}
                src={`${image.url}`}
                style={styles.image}
              />
            ))}
          </View>
          <View style={styles.header} wrap={false}>
            <Text style={{ width: "25%", ...styles.cell3 }}>Scope of Work</Text>
            <Text style={{ width: "75%", ...styles.cell3 }}>
              {data?.scopeOfWork}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "5%", ...styles.cell3 }}>Sr. No</Text>
            <Text style={{ width: "35%", ...styles.cell3 }}>Component</Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>Defect</Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>Observation</Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "5%", ...styles.cell3 }}>1. </Text>
            <Text style={{ width: "35%", ...styles.cell3 }}>
              {data?.component}
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.defect}
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.observation}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "15%", ...styles.cell3 }}>
              Comments / Result
            </Text>
            <Text style={{ width: "85%", ...styles.cell3 }}>
              {data?.componentResult}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "100%", ...styles.cell3 }}>
              Equipment Used During Inspection
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "10%", ...styles.cell3 }}>Sr. No</Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>Equipment</Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              Equipment ID No / Sr. No
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              Calibration Validity
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "10%", ...styles.cell3 }}>1</Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>AC/DC Yoke</Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.acdcYokeEquipmentID}
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.acdcYokeCalibrationValidity}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "10%", ...styles.cell3 }}>2</Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>Black Light </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.blackLightEquipmentID}
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.blackLightCalibrationValidity}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "10%", ...styles.cell3 }}>3</Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>Lux Meter </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.luxMeterEquipmentID}
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.luxMeterCalibrationValidity}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "10%", ...styles.cell3 }}>4</Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>Dry Powder </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.dryPowderEquipmentID}
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.dryPowderCalibrationValidity}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "10%", ...styles.cell3 }}>5</Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>UV Meter </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.uvMeterEquipmentID}
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.uvMeterCalibrationValidity}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={{ width: "10%", ...styles.cell3 }}>6</Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>Pie Gauge </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.pieGaugeEquipmentID}
            </Text>
            <Text style={{ width: "30%", ...styles.cell3 }}>
              {data?.pieGaugeCalibrationValidity}
            </Text>
          </View>
          <View style={{ margin: 10 }}></View>

          <View style={styles.header}>
            <Text style={{ width: "50%", ...styles.cell3 }}>
              Identity of Person Performed Examination
            </Text>
            <Text style={{ width: "50%", ...styles.cell3 }}>
              Witness / Reviewed BY Inspection Authority
            </Text>
          </View>
          <View style={styles.header}>
            <View
              style={{ width: "50%", ...styles.cell2, ...styles.nestedCell }}
            >
              <Text>Name :</Text>
              <Text>Sign :</Text>
              <View style={{ margin: 3 }}></View>
              <Text>ASNT LEVEL II</Text>
              <Text>Date :</Text>
            </View>
            <View
              style={{ width: "50%", ...styles.cell2, ...styles.nestedCell }}
            >
              <Text>Name :</Text>
              <Text>Sign :</Text>
              <View style={{ margin: 3 }}></View>
              <Text>ASNT LEVEL II</Text>
              <Text>Date :</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MagneticParticleInspection;
