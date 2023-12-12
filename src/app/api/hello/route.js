import { NextResponse } from "next/server";
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import MainData from "@/app/commons/maindata";

export async function POST(req, res){

   const body = await req.json();

   const newData = {
    id: uuidv4(),
    name: body.name,
    notes: body.notes,
  };

  // Add the new data to the MainData array
  MainData.push(newData);
   

   try {
    const filePath = path.resolve( 'src/app/commons/maindata.js');
    const fileContent = `const MainData = ${JSON.stringify(MainData, null, 2)};\n\nexport default MainData;`;

    await fs.writeFile(filePath, fileContent);


    const response = { 'status': 200, 'Message': 'Data added successfully' };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error writing to file:', error);
    const response = { 'status': 500, 'Message': 'Internal Server Error' };
    return NextResponse.json(response);
  }


}


export async function DELETE(req, res){
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    const updatedMainData = MainData.filter(item => item.id !== id);



    try {
        const filePath = path.resolve( 'src/app/commons/maindata.js');
        const fileContent = `const MainData = ${JSON.stringify(updatedMainData, null, 2)};\n\nexport default MainData;`;
    
        await fs.writeFile(filePath, fileContent);
    
    
        const response = { 'status': 200, 'Message': 'Data Deleted successfully' };
        return NextResponse.json(response);
      } catch (error) {
        console.error('Error writing to file:', error);
        const response = { 'status': 500, 'Message': 'Internal Server Error' };
        return NextResponse.json(response);
      }
    
}


export async function PUT(req,res){
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();

    const indexToUpdate = MainData.findIndex(item => item.id === id);

    if (indexToUpdate === -1) {
      const response = { 'status': 404, 'Message': 'Item not found for the given id' };
      return NextResponse.json(response);
    }

    const updatedArraydata = {
      id:body.id,
      name: body.name,
      notes: body.notes
    };

    const updatedMainData = [...MainData];
    updatedMainData[indexToUpdate] = updatedArraydata;

    const filePath = path.resolve('src/app/commons/maindata.js');
    const fileContent = `const MainData = ${JSON.stringify(updatedMainData, null, 2)};\n\nexport default MainData;`;

    await fs.writeFile(filePath, fileContent);

    const response = { 'status': 200, 'Message': 'Data Updated successfully' };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating data:', error);
    const response = { 'status': 500, 'Message': 'Internal Server Error' };
    return NextResponse.json(response);
  }
}