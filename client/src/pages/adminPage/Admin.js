import React, { useState } from "react";
import { Form, FormGroup, Input, Col, Row, Button, Label } from "reactstrap";
import "./Admin.css";
function AdminPage() {
  return (
    <>
      <div className="AdminPage">
        <Row>
          <Col md={2}></Col>
          <Col md={8} className="ApprovalContainer">
            <Row>
              <Col md={12} className="ApprovalHolder"></Col>
            </Row>
          </Col>
          <Col md={2}></Col>
        </Row>
      </div>
    </>
  );
}

export default AdminPage;
