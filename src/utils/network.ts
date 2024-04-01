import { useState } from "react";
import { Prescription } from "../types";
// import { API_URL } from "react-native-dotenv";

interface GetDosageType {
  dose: Prescription[];
  loading: boolean;
}
