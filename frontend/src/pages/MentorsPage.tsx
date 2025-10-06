import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbList } from "@/lib/utils/ui/breadcrumb";
import { Card, CardContent, CardFooter } from "@/lib/utils/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/lib/utils/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from "@/lib/utils/ui/dropdown-menu";
import { Button } from "@/lib/utils/ui/button";
import { Input } from "@/lib/utils/ui/input";
import { 
  MoreHorizontal, 
  ArrowUp, 
  ArrowDown, 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Download, 
  Upload,
  FileDown,
  X
} from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/lib/utils/ui/pagination";
import { testMentors, centers, batches, type Mentor } from "@/data/mentorsData";

const MentorsPage = () => {
  const location = useLocation();
  const [mentors, setMentors] = useState<Mentor[]>(testMentors);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>(testMentors);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState<{ field: keyof Mentor | '', order: 'asc' | 'desc' }>({ field: '', order: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedActiveMentee, setSelectedActiveMentee] = useState('');
  const [selectedCurrentBatch, setSelectedCurrentBatch] = useState('');
  const [selectedLastBatch, setSelectedLastBatch] = useState('');
  const [selectedSevaDateFrom, setSelectedSevaDateFrom] = useState('');
  const [selectedSevaDateTo, setSelectedSevaDateTo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [showMentorDetails, setShowMentorDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMentor, setEditingMentor] = useState<Mentor | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [mentorToDelete, setMentorToDelete] = useState<Mentor | null>(null);

  // Handle navigation from search
  useEffect(() => {
    const state = location.state as { selectedMentor?: Mentor; showDetails?: boolean };
    if (state?.selectedMentor && state?.showDetails) {
      setSelectedMentor(state.selectedMentor);
      setShowMentorDetails(true);
      // Clear the state to prevent showing the modal on subsequent visits
      window.history.replaceState(null, '');
    }
  }, [location.state]);

  // Filter and search functionality
  useEffect(() => {
    let filtered = mentors.filter(mentor => {
      const matchesSearch = searchTerm === '' || 
        mentor.mentorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.mentorEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.mhtId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.activeMenteeName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCenter = selectedCenter === '' || mentor.center === selectedCenter;
      const matchesActiveMentee = selectedActiveMentee === '' || mentor.activeMentee === selectedActiveMentee;
      const matchesCurrentBatch = selectedCurrentBatch === '' || mentor.activeMenteeCurrentBatch === selectedCurrentBatch;
      const matchesLastBatch = selectedLastBatch === '' || mentor.lastBatch === selectedLastBatch;
      
      // Date range filter for seva date
      const matchesSevaDate = (() => {
        if (!selectedSevaDateFrom && !selectedSevaDateTo) return true;
        const sevaDate = new Date(mentor.lastSevaDate);
        const fromDate = selectedSevaDateFrom ? new Date(selectedSevaDateFrom) : null;
        const toDate = selectedSevaDateTo ? new Date(selectedSevaDateTo) : null;
        
        if (fromDate && toDate) {
          return sevaDate >= fromDate && sevaDate <= toDate;
        } else if (fromDate) {
          return sevaDate >= fromDate;
        } else if (toDate) {
          return sevaDate <= toDate;
        }
        return true;
      })();
      
      return matchesSearch && matchesCenter && matchesActiveMentee && matchesCurrentBatch && matchesLastBatch && matchesSevaDate;
    });
    
    if (sortBy.field) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortBy.field as keyof Mentor];
        const bValue = b[sortBy.field as keyof Mentor];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortBy.order === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        }
        
        return sortBy.order === 'asc' 
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
    }
    
    setFilteredMentors(filtered);
    setCurrentPage(1);
  }, [mentors, searchTerm, selectedCenter, selectedActiveMentee, selectedCurrentBatch, selectedLastBatch, selectedSevaDateFrom, selectedSevaDateTo, sortBy]);  

  const handleSortChange = (field: keyof Mentor) => {
    setSortBy(prevSort => ({
      field,
      order: prevSort.field === field ? (prevSort.order === 'asc' ? 'desc' : 'asc') : 'asc'
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleDelete = (mentor: Mentor) => {
    setMentorToDelete(mentor);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (mentorToDelete) {
      setMentors(prev => prev.filter(m => m.id !== mentorToDelete.id));
      setShowDeleteConfirm(false);
      setMentorToDelete(null);
    }
  };

  const handleEdit = (mentor: Mentor) => {
    setEditingMentor({ ...mentor });
    setIsEditing(true);
  };

  const handleAddMentor = () => {
    const newMentor: Mentor = {
      id: Date.now().toString(),
      mentorName: '',
      mentorEmail: '',
      center: '',
      mhtId: '',
      activeMentee: 'No',
      activeMenteeName: '',
      activeMenteeCurrentBatch: '',
      lastBatch: '',
      activeSince: new Date().toISOString().split('T')[0],
      lastSevaDate: new Date().toISOString().split('T')[0]
    };
    setEditingMentor(newMentor);
    setIsEditing(true);
  };

  const saveMentor = () => {
    if (editingMentor) {
      if (editingMentor.id && mentors.find(m => m.id === editingMentor.id)) {
        // Update existing mentor
        setMentors(prev => prev.map(m => m.id === editingMentor.id ? editingMentor : m));
      } else {
        // Add new mentor
        const newId = Date.now().toString();
        setMentors(prev => [...prev, { ...editingMentor, id: newId }]);
      }
      setIsEditing(false);
      setEditingMentor(null);
    }
  };

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const rows = text.split('\n').map(row => row.split(','));
        const headers = rows[0];
        
        if (headers.length >= 10) {
          const newMentors = rows.slice(1).filter(row => row.length >= 10 && row[0].trim()).map((row, index) => ({
            id: `imported_${Date.now()}_${index}`,
            mentorName: row[0].replace(/"/g, '').trim(),
            mentorEmail: row[1].replace(/"/g, '').trim(),
            center: row[2].replace(/"/g, '').trim(),
            mhtId: row[3].replace(/"/g, '').trim(),
            activeMentee: row[4].replace(/"/g, '').trim() as 'Yes' | 'No',
            activeMenteeName: row[5].replace(/"/g, '').trim(),
            activeMenteeCurrentBatch: row[6].replace(/"/g, '').trim(),
            lastBatch: row[7].replace(/"/g, '').trim(),
            activeSince: row[8].replace(/"/g, '').trim(),
            lastSevaDate: row[9].replace(/"/g, '').trim()
          }));
          
          setMentors(prev => [...prev, ...newMentors]);
          alert(`Successfully imported ${newMentors.length} mentors!`);
        } else {
          alert('Invalid CSV format. Please use the template provided.');
        }
      };
      reader.readAsText(file);
    }
    event.target.value = '';
  };

  const handleViewDetails = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setShowMentorDetails(true);
  };

  const exportToCSV = () => {
    const headers = ['Mentor Name', 'Email', 'Center', 'MHT ID', 'Active Mentee', 'Active Mentee Name', 'Current Batch', 'Last Batch', 'Active Since', 'Last Seva Date'];
    
    const csvData = [
      headers,
      ...filteredMentors.map(mentor => [
        `"${mentor.mentorName}"`,
        `"${mentor.mentorEmail}"`,
        `"${mentor.center}"`,
        `"${mentor.mhtId}"`,
        `"${mentor.activeMentee}"`,
        `"${mentor.activeMenteeName || ''}"`,
        `"${mentor.activeMenteeCurrentBatch || ''}"`,
        `"${mentor.lastBatch || ''}"`,
        `"${mentor.activeSince}"`,
        `"${mentor.lastSevaDate}"`
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "mentors_data.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadTemplate = () => {
    const headers = ['Mentor Name', 'Email', 'Center', 'MHT ID', 'Active Mentee', 'Active Mentee Name', 'Current Batch', 'Last Batch', 'Active Since', 'Last Seva Date'];
    const sampleData = ['"John Doe"', '"john.doe@example.com"', '"Ahmedabad Central"', '"MHT999"', '"Yes"', '"Jane Smith"', '"LG Batch 77"', '"LG Batch 75"', '"2024-01-01"', '"2024-10-06"'];
    
    const csvContent = [headers.join(','), sampleData.join(',')].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "mentors_template.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCenter('');
    setSelectedActiveMentee('');
    setSelectedCurrentBatch('');
    setSelectedLastBatch('');
    setSelectedSevaDateFrom('');
    setSelectedSevaDateTo('');
  };

  const pageCount = Math.ceil(filteredMentors.length / pageSize);
  const paginatedMentors = filteredMentors.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const activeFiltersCount = [searchTerm, selectedCenter, selectedActiveMentee, selectedCurrentBatch, selectedLastBatch, selectedSevaDateFrom, selectedSevaDateTo].filter(f => f !== '').length;

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/home">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/mentors">Mentors</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            👨‍🏫 Mentors Management
          </h1>
          <p className="text-gray-600 mt-1">Manage mentor profiles and track their mentoring activities</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={downloadTemplate}>
            <FileDown className="h-4 w-4 mr-2" />
            CSV Template
          </Button>
          <label className="cursor-pointer">
            <Button variant="outline" size="sm" asChild>
              <span>
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </span>
            </Button>
            <input
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              className="hidden"
            />
          </label>
          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600" onClick={handleAddMentor}>
            <Plus className="h-4 w-4 mr-2" />
            Add Mentor
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search mentors, emails, MHT ID, or mentee names..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </Button>
              
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="space-y-4 mt-4 pt-4 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Center</label>
                  <select 
                    value={selectedCenter} 
                    onChange={(e) => setSelectedCenter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  >
                    <option value="">All Centers</option>
                    {centers.map(center => (
                      <option key={center} value={center}>{center}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Active Mentee</label>
                  <select 
                    value={selectedActiveMentee} 
                    onChange={(e) => setSelectedActiveMentee(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  >
                    <option value="">All Status</option>
                    <option value="Yes">Has Active Mentee</option>
                    <option value="No">No Active Mentee</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Current Batch</label>
                  <select 
                    value={selectedCurrentBatch} 
                    onChange={(e) => setSelectedCurrentBatch(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  >
                    <option value="">All Batches</option>
                    {batches.map(batch => (
                      <option key={batch} value={batch}>{batch}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Last Batch</label>
                  <select 
                    value={selectedLastBatch} 
                    onChange={(e) => setSelectedLastBatch(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  >
                    <option value="">All Last Batches</option>
                    {batches.map(batch => (
                      <option key={batch} value={batch}>{batch}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Seva Date From</label>
                  <Input
                    type="date"
                    value={selectedSevaDateFrom}
                    onChange={(e) => setSelectedSevaDateFrom(e.target.value)}
                    className="text-sm"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Seva Date To</label>
                  <Input
                    type="date"
                    value={selectedSevaDateTo}
                    onChange={(e) => setSelectedSevaDateTo(e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {paginatedMentors.length} of {filteredMentors.length} mentors
        </p>
        <Button variant="outline" size="sm" onClick={exportToCSV}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Mentors Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSortChange('mentorName')}>
                      Mentor Name {sortBy.field === 'mentorName' ? (sortBy.order === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />) : ''}
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSortChange('center')}>
                      Center {sortBy.field === 'center' ? (sortBy.order === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />) : ''}
                    </Button>
                  </TableHead>
                  <TableHead>MHT ID</TableHead>
                  <TableHead>Active Mentee</TableHead>
                  <TableHead>Current Mentee</TableHead>
                  <TableHead>Current Batch</TableHead>
                  <TableHead>
                    <Button variant="ghost" onClick={() => handleSortChange('lastSevaDate')}>
                      Last Seva {sortBy.field === 'lastSevaDate' ? (sortBy.order === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />) : ''}
                    </Button>
                  </TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedMentors.map((mentor) => (
                  <TableRow key={mentor.id} className="hover:bg-blue-50">
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{mentor.mentorName}</div>
                        <div className="text-sm text-gray-500">{mentor.mentorEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {mentor.center}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{mentor.mhtId}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mentor.activeMentee === 'Yes' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {mentor.activeMentee}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">
                      {mentor.activeMenteeName || <span className="text-gray-400">-</span>}
                    </TableCell>
                    <TableCell className="text-xs text-gray-600 max-w-32 truncate">
                      {mentor.activeMenteeCurrentBatch || <span className="text-gray-400">-</span>}
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(mentor.lastSevaDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDetails(mentor)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(mentor)}>
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(mentor)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {pageCount}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <select 
              value={pageSize} 
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="px-2 py-1 border border-gray-200 rounded text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
                const page = i + 1;
                return (
                  <PaginationItem key={page}>
                    <PaginationLink 
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < pageCount && handlePageChange(currentPage + 1)}
                  className={currentPage === pageCount ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>

      {/* Mentor Details Modal */}
      {showMentorDetails && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">Mentor Details</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowMentorDetails(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Mentor Name</label>
                <p className="font-medium">{selectedMentor.mentorName}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="font-medium">{selectedMentor.mentorEmail}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Center</label>
                <p className="font-medium">{selectedMentor.center}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">MHT ID</label>
                <p className="font-medium font-mono">{selectedMentor.mhtId}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Active Mentee</label>
                <p className="font-medium">{selectedMentor.activeMentee}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Active Since</label>
                <p className="font-medium">{new Date(selectedMentor.activeSince).toLocaleDateString()}</p>
              </div>
              
              {selectedMentor.activeMentee === 'Yes' && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Active Mentee Name</label>
                    <p className="font-medium">{selectedMentor.activeMenteeName}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Current Batch</label>
                    <p className="font-medium">{selectedMentor.activeMenteeCurrentBatch}</p>
                  </div>
                </>
              )}
              
              <div>
                <label className="text-sm font-medium text-gray-500">Last Batch</label>
                <p className="font-medium">{selectedMentor.lastBatch || 'N/A'}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500">Last Seva Date</label>
                <p className="font-medium">{new Date(selectedMentor.lastSevaDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                onClick={() => {
                  handleEdit(selectedMentor);
                  setShowMentorDetails(false);
                }}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Details
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowMentorDetails(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit/Add Mentor Modal */}
      {isEditing && editingMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {editingMentor.id && mentors.find(m => m.id === editingMentor.id) ? 'Edit Mentor' : 'Add New Mentor'}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Mentor Name *</label>
                <Input
                  value={editingMentor.mentorName}
                  onChange={(e) => setEditingMentor(prev => prev ? {...prev, mentorName: e.target.value} : null)}
                  placeholder="Enter mentor name"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Email *</label>
                <Input
                  type="email"
                  value={editingMentor.mentorEmail}
                  onChange={(e) => setEditingMentor(prev => prev ? {...prev, mentorEmail: e.target.value} : null)}
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Center *</label>
                <select 
                  value={editingMentor.center}
                  onChange={(e) => setEditingMentor(prev => prev ? {...prev, center: e.target.value} : null)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="">Select Center</option>
                  {centers.map(center => (
                    <option key={center} value={center}>{center}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">MHT ID *</label>
                <Input
                  value={editingMentor.mhtId}
                  onChange={(e) => setEditingMentor(prev => prev ? {...prev, mhtId: e.target.value} : null)}
                  placeholder="Enter MHT ID"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Active Mentee</label>
                <select 
                  value={editingMentor.activeMentee}
                  onChange={(e) => setEditingMentor(prev => prev ? {...prev, activeMentee: e.target.value as 'Yes' | 'No'} : null)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Active Since</label>
                <Input
                  type="date"
                  value={editingMentor.activeSince}
                  onChange={(e) => setEditingMentor(prev => prev ? {...prev, activeSince: e.target.value} : null)}
                />
              </div>
              
              {editingMentor.activeMentee === 'Yes' && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Active Mentee Name</label>
                    <Input
                      value={editingMentor.activeMenteeName}
                      onChange={(e) => setEditingMentor(prev => prev ? {...prev, activeMenteeName: e.target.value} : null)}
                      placeholder="Enter mentee name"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Current Batch</label>
                    <select 
                      value={editingMentor.activeMenteeCurrentBatch}
                      onChange={(e) => setEditingMentor(prev => prev ? {...prev, activeMenteeCurrentBatch: e.target.value} : null)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                      <option value="">Select Batch</option>
                      {batches.map(batch => (
                        <option key={batch} value={batch}>{batch}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Last Batch</label>
                <select 
                  value={editingMentor.lastBatch}
                  onChange={(e) => setEditingMentor(prev => prev ? {...prev, lastBatch: e.target.value} : null)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="">Select Last Batch</option>
                  {batches.map(batch => (
                    <option key={batch} value={batch}>{batch}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Last Seva Date</label>
                <Input
                  type="date"
                  value={editingMentor.lastSevaDate}
                  onChange={(e) => setEditingMentor(prev => prev ? {...prev, lastSevaDate: e.target.value} : null)}
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button 
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                onClick={saveMentor}
                disabled={!editingMentor.mentorName || !editingMentor.mentorEmail || !editingMentor.center || !editingMentor.mhtId}
              >
                Save Changes
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && mentorToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Mentor</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete mentor <strong>{mentorToDelete.mentorName}</strong>? 
              This will permanently remove their record from the system.
            </p>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button 
                size="sm" 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={confirmDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorsPage;