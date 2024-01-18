"use client";
import * as React from "react";
import {
  Box,
  Table,
  Select,
  Option,
  FormLabel,
  FormControl,
  Stack,
  Checkbox,
} from "@mui/joy";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function TableHover() {
  return (
    <div>
      <Box
        sx={{
          display: "grid",
          rowGap: 1,
        }}
      >
        <FormControl orientation="horizontal">
          <FormLabel>Creator contains</FormLabel>
          <Stack spacing={2}>
            <Select name="listOfCreators" multiple sx={{ minWidth: 200 }}>
              <Option value="dog">Dog</Option>
              <Option value="cat">Cat</Option>
              <Option value="fish">Fish</Option>
              <Option value="bird">Bird</Option>
            </Select>
          </Stack>
        </FormControl>
        <FormControl orientation="horizontal">
          <FormLabel>Assigned by contains</FormLabel>
          <Stack spacing={2}>
            <Select name="listOfAssignedBy" multiple sx={{ minWidth: 200 }}>
              <Option value="dog">Dog</Option>
              <Option value="cat">Cat</Option>
              <Option value="fish">Fish</Option>
              <Option value="bird">Bird</Option>
            </Select>
          </Stack>
        </FormControl>
        <FormControl orientation="horizontal">
          <FormLabel>Due</FormLabel>
          <Stack spacing={2} direction="row">
            <Checkbox label="from 2024-01-17 10:00" />
            <Checkbox label="to 2024-01-17 11:00" />
          </Stack>
        </FormControl>

        <FormControl orientation="horizontal">
          <FormLabel>Sort by</FormLabel>
          <Stack spacing={2}>
            <Select name="sortBy" sx={{ minWidth: 200 }}>
              <Option value="dog">Dog</Option>
              <Option value="cat">Cat</Option>
              <Option value="fish">Fish</Option>
              <Option value="bird">Bird</Option>
            </Select>
          </Stack>
        </FormControl>
      </Box>
      <Table hoverRow>
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Column width (40%)</th>
            <th>Calories</th>
            <th>Fat&nbsp;(g)</th>
            <th>Carbs&nbsp;(g)</th>
            <th>Protein&nbsp;(g)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.calories}</td>
              <td>{row.fat}</td>
              <td>{row.carbs}</td>
              <td>{row.protein}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
