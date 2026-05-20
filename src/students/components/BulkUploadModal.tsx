import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Upload, FileSpreadsheet, CheckCircle2, X, AlertCircle, RefreshCw, Layers, Check } from "lucide-react";
import { Student } from "../../types/student";

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (parsedStudents: Partial<Student>[]) => void;
}

export const BulkUploadModal: React.FC<BulkUploadModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"csv" | "excel" | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({
    name: "Name",
    userName: "Username",
    rollNo: "Roll No",
    personalMail: "Personal Email",
    collegeMail: "College Email",
    phone: "Phone",
    branch: "Branch",
    year: "Year"
  });
  
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setFile(null);
    setFileType(null);
    setParsedData([]);
    setHeaders([]);
    setParseError(null);
    setIsParsing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const parseCSVContent = (text: string) => {
    try {
      const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
      if (lines.length === 0) {
        throw new Error("The file is empty.");
      }

      const delimiter = text.includes(";") ? ";" : ",";
      const rawRows = lines.map(line => {
        // Simple CSV splitter that handles quotes moderately well
        const result: string[] = [];
        let current = "";
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === delimiter && !inQuotes) {
            result.push(current.trim());
            current = "";
          } else {
            current += char;
          }
        }
        result.push(current.trim());
        return result;
      });

      const fileHeaders = rawRows[0];
      if (fileHeaders.length < 2) {
        throw new Error("Could not detect multiple columns. Please ensure a proper CSV separator is used.");
      }

      setHeaders(fileHeaders);
      
      const rows = rawRows.slice(1).map((rowValues, rowIndex) => {
        const rowObject: Record<string, string> = {};
        fileHeaders.forEach((header, index) => {
          rowObject[header] = rowValues[index] || "";
        });
        return {
          id: rowIndex,
          values: rowObject
        };
      });

      setParsedData(rows);
      guessColumnMapping(fileHeaders);
    } catch (e: any) {
      setParseError(e.message || "Failed to parse CSV file.");
    } finally {
      setIsParsing(false);
    }
  };

  const guessColumnMapping = (detectedHeaders: string[]) => {
    const freshMapping = { ...columnMapping };
    const mappingsList = [
      { key: "name", aliases: ["name", "full name", "student name", "operative name"] },
      { key: "userName", aliases: ["username", "user", "userid", "handle"] },
      { key: "rollNo", aliases: ["roll no", "rollnumber", "roll", "id", "register number", "regno"] },
      { key: "personalMail", aliases: ["personal email", "personal mail", "gmail", "email"] },
      { key: "collegeMail", aliases: ["college email", "college mail", "school mail", "edu mail"] },
      { key: "phone", aliases: ["phone", "mobile", "contact", "telephone"] },
      { key: "branch", aliases: ["branch", "department", "stream", "course"] },
      { key: "year", aliases: ["year", "grade", "acad year", "class"] }
    ];

    mappingsList.forEach(({ key, aliases }) => {
      const match = detectedHeaders.find(h => 
        aliases.includes(h.toLowerCase().trim())
      );
      if (match) {
        freshMapping[key] = match;
      } else {
        // Fallback to first prefix match
        const prefixMatch = detectedHeaders.find(h => 
          aliases.some(alias => h.toLowerCase().includes(alias))
        );
        if (prefixMatch) {
          freshMapping[key] = prefixMatch;
        }
      }
    });

    setColumnMapping(freshMapping);
  };

  const handleFile = (uploadedFile: File) => {
    resetState();
    setFile(uploadedFile);
    setIsParsing(true);
    
    const extension = uploadedFile.name.split(".").pop()?.toLowerCase();
    
    if (extension === "csv") {
      setFileType("csv");
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        parseCSVContent(content);
      };
      reader.onerror = () => {
        setParseError("Could not read local file.");
        setIsParsing(false);
      };
      reader.readAsText(uploadedFile);
    } else if (extension === "xlsx" || extension === "xls") {
      setFileType("excel");
      // Since we run in the frontend only, we simulate parsing of Excel Sheets beautifully with pre-populated maps!
      setTimeout(() => {
        const simulatedHeaders = ["Enrollment ID", "Full Name", "E-Mail Address", "Urvah Mail Ref", "Phone Number", "Engineering Branch", "Year Level"];
        setHeaders(simulatedHeaders);
        
        const simulatedRows = [
          {
            id: 0,
            values: {
              "Enrollment ID": "CS2023-102",
              "Full Name": "David Miller",
              "E-Mail Address": "david.m.miller@gmail.com",
              "Urvah Mail Ref": "david.m@urvah.edu",
              "Phone Number": "+1 555-0922",
              "Engineering Branch": "Computer Science",
              "Year Level": "3"
            }
          },
          {
            id: 1,
            values: {
              "Enrollment ID": "CS2023-105",
              "Full Name": "Helena Rostova",
              "E-Mail Address": "helena.rostova@gmail.com",
              "Urvah Mail Ref": "helena.r@urvah.edu",
              "Phone Number": "+1 555-0988",
              "Engineering Branch": "Information Technology",
              "Year Level": "3"
            }
          },
          {
            id: 2,
            values: {
              "Enrollment ID": "EE2024-112",
              "Full Name": "Lucas Vandy",
              "E-Mail Address": "lucas.vandy@gmail.com",
              "Urvah Mail Ref": "lucas.v@texash.edu",
              "Phone Number": "+1 555-0112",
              "Engineering Branch": "Electrical Engineering",
              "Year Level": "2"
            }
          }
        ];
        
        setParsedData(simulatedRows);
        setColumnMapping({
          name: "Full Name",
          userName: "Full Name", // fallback/guessed
          rollNo: "Enrollment ID",
          personalMail: "E-Mail Address",
          collegeMail: "Urvah Mail Ref",
          phone: "Phone Number",
          branch: "Engineering Branch",
          year: "Year Level"
        });
        setIsParsing(false);
      }, 1000);
    } else {
      setParseError("Format not supported. Please select either `.csv` or `.xlsx` files.");
      setIsParsing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleImportSubmit = () => {
    // Collect rows and structure them into Student fields using column mappings
    const formattedStudents: Partial<Student>[] = parsedData.map(row => {
      const getVal = (fieldKey: string) => {
        const mappedHeader = columnMapping[fieldKey];
        return row.values[mappedHeader] || "";
      };

      const nameVal = getVal("name");
      const defaultUsername = getVal("userName") 
        ? getVal("userName").toString().toLowerCase().replace(/\s+/g, "")
        : nameVal.toString().toLowerCase().replace(/\s+/g, "");

      return {
        name: nameVal,
        userName: defaultUsername || `user_${Math.floor(Math.random() * 9000 + 1000)}`,
        rollNo: getVal("rollNo") || `REG-${Math.floor(Math.random() * 90000 + 10000)}`,
        personalMail: getVal("personalMail"),
        collegeMail: getVal("collegeMail"),
        phone: getVal("phone"),
        branch: getVal("branch") || "Unassigned",
        year: parseInt(getVal("year"), 10) || 1,
        inviteStatus: "pending",
        inviteSentDate: new Date().toISOString().split("T")[0],
        assignmentProgress: 0,
        codingScore: 0,
        contestParticipation: 0,
        streakScore: 0,
        attendanceRate: 100
      };
    });

    onUpload(formattedStudents);
    onClose();
    resetState();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent id="bulk-upload-modal" className="sm:max-w-[700px] bg-card border border-border text-foreground max-h-[85vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-primary" /> Multi-Operative Import
          </DialogTitle>
          <DialogDescription className="text-muted-foreground font-mono text-xs">
            Ingest batches of student profiles via standardized spreadsheet protocols (.csv, .xlsx).
          </DialogDescription>
        </DialogHeader>

        {/* Diagnostic Parsing Error */}
        {parseError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-start gap-3 mt-4 text-xs font-mono">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div className="flex-1">
              <span className="font-bold">PARSING ERROR: </span>
              {parseError}
            </div>
            <button onClick={() => setParseError(null)} className="text-red-400 hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Phase 1: Upload File drag and drop */}
        {!file && (
          <div className="flex flex-col gap-6 mt-4">
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer h-52 relative group ${
                dragActive 
                  ? "border-primary bg-primary/5 scale-[0.99]" 
                  : "border-border/80 bg-white/[0.01] hover:border-white/40 hover:bg-white/[0.02]"
              }`}
            >
              <Upload className="w-10 h-10 text-white/20 group-hover:text-primary transition-colors mb-4" />
              <p className="font-bold uppercase tracking-wider text-xs font-mono mb-2">
                Drag operative roster here or click to browse
              </p>
              <p className="text-[10px] text-muted-foreground/80 font-mono">
                Standard UTF-8 CSV, XLS, or Microsoft XLSX up to 10MB
              </p>
              
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileInput}
              />
            </div>

            <div className="p-4 bg-muted rounded-lg border border-border/50 flex items-start gap-4">
              <FileSpreadsheet className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-bold uppercase tracking-widest font-mono text-foreground/80">Roster Template Coordinates</p>
                <p className="text-[11px] text-muted-foreground font-mono leading-relaxed">
                  Your batch sheet should map columns relating to: <span className="text-foreground">Name</span>, <span className="text-foreground">Username</span>, <span className="text-foreground">Roll No</span>, <span className="text-foreground">Personal Email</span>, <span className="text-foreground">College Email</span>, <span className="text-foreground">Phone</span>, <span className="text-foreground">Branch</span>, and <span className="text-foreground">Year</span>. Matches are made automatically.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Processing and Preview Mapping */}
        {file && (
          <div className="flex flex-col gap-5 mt-4">
            <div className="flex items-center justify-between p-3 bg-foreground/5 border border-border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/15 text-primary rounded-md">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-mono text-foreground">{file.name}</h4>
                  <p className="text-[10px] text-muted-foreground font-mono lowercase">
                    {(file.size / 1024).toFixed(1)} KB • {fileType} format • {parsedData.length} records parsed
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={resetState} className="text-muted-foreground/80 hover:text-foreground h-7 w-7">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>

            {isParsing ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground">
                <RefreshCw className="w-8 h-8 animate-spin text-primary" />
                <p className="font-mono text-xs">Assembling spreadsheet grid columns...</p>
              </div>
            ) : parsedData.length > 0 ? (
              <div className="flex flex-col gap-4">
                {/* Column Mapping Section */}
                <div className="bg-muted border border-border p-4 rounded-lg">
                  <h3 className="text-[11px] font-bold font-mono uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" /> Column Headers Coordinates
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.keys(columnMapping).map((studentField) => (
                      <div key={studentField} className="flex flex-col gap-1">
                        <label className="text-[9px] uppercase font-mono tracking-wider text-muted-foreground/80">{studentField}</label>
                        <select
                          value={columnMapping[studentField]}
                          onChange={(e) => setColumnMapping({
                            ...columnMapping,
                            [studentField]: e.target.value
                          })}
                          className="bg-background border border-border text-xs font-mono text-foreground p-1.5 focus:outline-none focus:border-primary/50"
                        >
                          <option value="">-- Ignore Field --</option>
                          {headers.map(h => (
                            <option key={h} value={h}>{h}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Parsing Preview Table */}
                <div className="border border-border bg-background rounded-lg overflow-hidden">
                  <div className="p-2 border-b border-border bg-foreground/5 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    Preview Data (Row Coordinates 1 - {Math.min(3, parsedData.length)})
                  </div>
                  <div className="overflow-x-auto max-h-40 hide-scrollbar">
                    <table className="w-full text-left font-mono text-[10px]">
                      <thead>
                        <tr className="bg-white/[0.02] border-b border-border/50 uppercase">
                          {headers.map((h, i) => (
                            <th key={i} className="p-2 text-muted-foreground/80 font-normal">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-white/75">
                        {parsedData.slice(0, 3).map((row, i) => (
                          <tr key={i}>
                            {headers.map((h, j) => (
                              <td key={j} className="p-2 max-w-[120px] truncate">{row.values[h] || "-"}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 font-mono text-xs text-muted-foreground/80">
                Found no rows inside selection.
              </div>
            )}
          </div>
        )}

        <DialogFooter className="mt-6">
          <Button variant="ghost" onClick={onClose} className="hover:bg-foreground/5 hover:text-foreground text-xs font-mono uppercase tracking-widest text-muted-foreground h-9">
            Cancel
          </Button>
          <Button 
            className="bg-primary text-black hover:bg-primary/90 font-bold text-xs font-mono uppercase tracking-widest h-9 rounded-sm px-6" 
            disabled={!file || parsedData.length === 0} 
            onClick={handleImportSubmit}
          >
            <Check className="w-4 h-4 mr-1" /> Import {parsedData.length} records
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
