// import React from 'react'
import Navbar from "@/components/elements/Navbar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function AppliedJob() {
  return (
    <div>
      <Navbar/>
      <h1 className="flex items-center justify-center mt-5 text-2xl font-semibold text-cyan-900">Applied Job</h1>
      <div className="flex items-center m-5">
      <Table>
  <TableCaption>A list of Applied Job .</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="">Company</TableHead>
      <TableHead>Role </TableHead>
      <TableHead>Applied On</TableHead>
      <TableHead>Application status</TableHead>
      {/* <TableHead className="text-right">Status</TableHead> */}
    </TableRow>
  </TableHeader>
  <TableBody>
    {
       [1,2,3,4].map((applications, index) =>(
         <TableRow key={index} className="font-semibold">
      <TableCell>Company</TableCell>
      <TableCell>Role</TableCell>
      <TableCell>	Applied On</TableCell>
      <TableCell><Badge>Application status</Badge></TableCell>
    </TableRow>

       ))
    }
      
  </TableBody>
</Table>

      </div>
    </div>
  );
}

export default AppliedJob;
