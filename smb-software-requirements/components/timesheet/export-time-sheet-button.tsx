"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { toast } from "sonner"

export function ExportTimeSheetButton() {
    const handleExport = () => {
        // Generate mock CSV data
        const csvContent = "data:text/csv;charset=utf-8," +
            "Date,Project,User,Hours,Notes\n" +
            "2023-06-25,Website Redesign,John Doe,4.5,Homepage wireframing\n" +
            "2023-06-25,CRM Implementation,John Doe,3.5,Data migration research\n" +
            "2023-06-26,Website Redesign,John Doe,6.0,Initial mockups\n" +
            "2023-06-26,Internal Admin,John Doe,2.0,Team meetings and sprint planning\n" +
            "2023-06-27,Mobile App Development,John Doe,8.0,React Native setup and routing\n";

        // Create a virtual anchor element and trigger download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `timesheet_export_${new Date().toISOString().split('T')[0]}.csv`);

        document.body.appendChild(link); // Required for certain browsers like FF
        link.click();

        document.body.removeChild(link);

        toast.success("Timesheet Exported Successfully", {
            description: "Check your downloads folder for the CSV file.",
        });
    }

    return (
        <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
        </Button>
    )
}
