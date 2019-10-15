import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@material-ui/core'

import './EmployeeManage.css'

export default function EmployeeManage() {
    
    return (
        <Paper className="manager">
            <TableHead>
                <TableRow>
                    <TableCell>McKay Nelson</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>tmckaynelson@yahoo.com</TableCell>
                    <TableCell>Edit/Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Jeff</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>tmckaynelson@yahoo.com</TableCell>
                    <TableCell>Edit/Delete</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Nader</TableCell>
                    <TableCell>Employee</TableCell>
                    <TableCell>tmckaynelson@yahoo.com</TableCell>
                    <TableCell>Edit/Delete</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Other Mark</TableCell>
                    <TableCell>Employee</TableCell>
                    <TableCell>tmckaynelson@yahoo.com</TableCell>
                    <TableCell>Edit/Delete</TableCell>
                </TableRow>
            </TableBody>
        </Paper>
    )
}
