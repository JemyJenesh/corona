import React, { useState, useEffect, useContext } from "react";
import { Table, Modal, Loader, Header, Input } from "semantic-ui-react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Highlighter from "react-highlight-words";

import { store } from "../store/contexts/store";

const Hospitals = () => {
  const { hospitals, hospitalsLoaded, loadHospitals } = useContext(store);

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    loadHospitals();
    document.title = "Hospitals in Nepal";
  }, []);

  const showMap = (hosp) => {
    setSelectedHospital(hosp);
    setOpen(true);
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} basic size="fullscreen">
        <Modal.Content image>
          {selectedHospital ? (
            <Map center={[...selectedHospital.location.coordinates]} zoom={14}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                position={[
                  selectedHospital.location.coordinates[0],
                  selectedHospital.location.coordinates[1],
                ]}
              >
                <Popup>
                  <Table>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Doctors</Table.Cell>
                        <Table.Cell>
                          {selectedHospital.capacity.doctors
                            ? selectedHospital.capacity.doctors
                            : "N/A"}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Nurses</Table.Cell>
                        <Table.Cell>
                          {selectedHospital.capacity.nurses
                            ? selectedHospital.capacity.nurses
                            : "N/A"}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Beds</Table.Cell>
                        <Table.Cell>
                          {selectedHospital.capacity.beds
                            ? selectedHospital.capacity.beds
                            : "N/A"}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Occupied Beds</Table.Cell>
                        <Table.Cell>
                          {selectedHospital.capacity.occupied_beds
                            ? selectedHospital.capacity.occupied_beds
                            : "N/A"}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Isolation Beds</Table.Cell>
                        <Table.Cell>
                          {selectedHospital.capacity.isolation_beds
                            ? selectedHospital.capacity.isolation_beds
                            : "N/A"}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Ventilators</Table.Cell>
                        <Table.Cell>
                          {selectedHospital.capacity.ventilators
                            ? selectedHospital.capacity.ventilators
                            : "N/A"}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Popup>
              </Marker>
            </Map>
          ) : (
            <Loader active />
          )}
        </Modal.Content>
      </Modal>
      {hospitalsLoaded && (
        <div
          className="questions-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Header style={{ margin: "1rem 0 2rem 0" }}>
            Click to view in map with details
          </Header>
          <Input
            icon="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}
      {hospitalsLoaded ? (
        <Table celled compact stackable selectable size="small">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>State</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Contact</Table.HeaderCell>
              <Table.HeaderCell>Contact Person</Table.HeaderCell>
              <Table.HeaderCell>Contact Person Number</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {hospitals.length > 0 &&
              hospitals
                .filter(
                  (hosp) =>
                    hosp.name
                      .substring(0, search.length)
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    hosp.address
                      .substring(0, search.length)
                      .toLowerCase()
                      .includes(search.toLowerCase())
                )
                .map((hosp, i) => (
                  <Table.Row key={hosp._id} onClick={() => showMap(hosp)}>
                    <Table.Cell>{++i}</Table.Cell>

                    <Table.Cell>
                      <Highlighter
                        searchWords={[search]}
                        autoEscape={true}
                        textToHighlight={hosp.name}
                      />
                    </Table.Cell>
                    <Table.Cell>{hosp.state}</Table.Cell>
                    <Table.Cell>
                      <Highlighter
                        searchWords={[search]}
                        autoEscape={true}
                        textToHighlight={hosp.address}
                      />
                    </Table.Cell>
                    <Table.Cell>{hosp.phone}</Table.Cell>

                    <Table.Cell>{hosp.contact_person}</Table.Cell>
                    <Table.Cell>{hosp.contact_person_number}</Table.Cell>
                  </Table.Row>
                ))}
          </Table.Body>
        </Table>
      ) : (
        <Loader active />
      )}
    </>
  );
};

export default Hospitals;
