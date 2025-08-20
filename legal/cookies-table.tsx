import { useState, useMemo } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '../ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '../ui/table';
import { Search, ArrowUpDown } from 'lucide-react';

interface Cookie {
  name: string;
  purpose: string;
  type: 'Técnica/Funcional' | 'Analítica' | 'Publicitaria' | 'Técnica/Publicitaria' | 'Analítica/Funcional';
  origin: 'Propia' | 'Terceros (Google)' | 'Terceros (Facebook)' | 'Terceros';
  duration: string;
  category: 'technical' | 'analytics' | 'advertising';
}

const cookiesData: Cookie[] = [
  {
    name: '_cs_c',
    purpose: 'Registrar consentimiento para Contentsquare',
    type: 'Analítica',
    origin: 'Propia',
    duration: '13 meses',
    category: 'analytics'
  },
  {
    name: '_cs_id',
    purpose: 'ID único para análisis de comportamiento (Contentsquare)',
    type: 'Analítica',
    origin: 'Propia',
    duration: '13 meses',
    category: 'analytics'
  },
  {
    name: '_cs_s',
    purpose: 'Páginas vistas en la sesión (Contentsquare)',
    type: 'Analítica',
    origin: 'Propia',
    duration: 'Sesión',
    category: 'analytics'
  },
  {
    name: '_ga',
    purpose: 'Distingue usuarios únicos (Google Analytics)',
    type: 'Analítica',
    origin: 'Terceros (Google)',
    duration: '2 años',
    category: 'analytics'
  },
  {
    name: '_ga_11BJFSRQW8',
    purpose: 'Mantiene estado de sesión (GA4)',
    type: 'Analítica',
    origin: 'Terceros (Google)',
    duration: '2 años',
    category: 'analytics'
  },
  {
    name: '_fbp',
    purpose: 'Seguimiento de campañas (Facebook)',
    type: 'Publicitaria',
    origin: 'Terceros (Facebook)',
    duration: '3 meses',
    category: 'advertising'
  },
  {
    name: 'datr',
    purpose: 'Detección de abusos/fraude (Facebook)',
    type: 'Técnica/Publicitaria',
    origin: 'Terceros (Facebook)',
    duration: '2 años',
    category: 'advertising'
  },
  {
    name: '_tccl_visit',
    purpose: 'Seguimiento de visitas (TikTok u otra)',
    type: 'Publicitaria',
    origin: 'Terceros',
    duration: 'Sesión',
    category: 'advertising'
  },
  {
    name: '_tccl_visitor',
    purpose: 'Identificador persistente visitante',
    type: 'Publicitaria',
    origin: 'Terceros',
    duration: '1 año',
    category: 'advertising'
  },
  {
    name: '_scc_session',
    purpose: 'Consentimiento (Smart Cookie Consent u otro)',
    type: 'Técnica/Funcional',
    origin: 'Propia',
    duration: '~20 min',
    category: 'technical'
  },
  {
    name: 'cp_challenge',
    purpose: 'Verificación de bots/seguridad',
    type: 'Técnica/Funcional',
    origin: 'Propia',
    duration: 'Sesión',
    category: 'technical'
  },
  {
    name: 'localTimeZone',
    purpose: 'Guardar zona horaria de usuario',
    type: 'Técnica/Funcional',
    origin: 'Propia',
    duration: 'Sesión',
    category: 'technical'
  },
  {
    name: 'mailpoet_page_view',
    purpose: 'Analítica/marketing MailPoet',
    type: 'Analítica/Funcional',
    origin: 'Propia',
    duration: '1 año',
    category: 'analytics'
  }
];

type SortField = 'name' | 'purpose' | 'type' | 'origin' | 'duration';
type SortDirection = 'asc' | 'desc';

interface CookiesTableProps {
  className?: string;
}

export function CookiesTable({ className = '' }: CookiesTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [originFilter, setOriginFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedCookies = useMemo(() => {
    let filtered = cookiesData.filter(cookie => {
      const matchesSearch = 
        cookie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cookie.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cookie.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || cookie.category === categoryFilter;
      
      const matchesOrigin = originFilter === 'all' || (
        (originFilter === 'propia' && cookie.origin === 'Propia') ||
        (originFilter === 'terceros' && cookie.origin.includes('Terceros'))
      );

      return matchesSearch && matchesCategory && matchesOrigin;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortDirection === 'desc') {
        [aValue, bValue] = [bValue, aValue];
      }
      
      return aValue.localeCompare(bValue);
    });

    return filtered;
  }, [searchTerm, categoryFilter, originFilter, sortField, sortDirection]);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'technical':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">Técnica</Badge>;
      case 'analytics':
        return <Badge variant="outline" className="bg-brand-primary/10 text-brand-primary border-brand-primary/20">Analítica</Badge>;
      case 'advertising':
        return <Badge variant="outline" className="bg-semantic-warn/10 text-semantic-warn border-semantic-warn/20">Publicitaria</Badge>;
      default:
        return <Badge variant="outline">Mixta</Badge>;
    }
  };

  const getOriginBadge = (origin: string) => {
    if (origin === 'Propia') {
      return <Badge variant="outline" className="bg-semantic-success/10 text-semantic-success border-semantic-success/20">Propia</Badge>;
    }
    return <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">Terceros</Badge>;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filters */}
      <div className="bg-gray-50 p-6 rounded-md space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar por nombre, finalidad o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtrar por categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              <SelectItem value="technical">Técnicas/Funcionales</SelectItem>
              <SelectItem value="analytics">Analíticas</SelectItem>
              <SelectItem value="advertising">Publicitarias</SelectItem>
            </SelectContent>
          </Select>

          {/* Origin Filter */}
          <Select value={originFilter} onValueChange={setOriginFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filtrar por origen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los orígenes</SelectItem>
              <SelectItem value="propia">Propias</SelectItem>
              <SelectItem value="terceros">Terceros</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-gray-600">
          Mostrando {filteredAndSortedCookies.length} de {cookiesData.length} cookies
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="min-w-[180px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('name')}
                    className="h-auto p-0 font-medium hover:bg-transparent"
                  >
                    Nombre
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead className="min-w-[300px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('purpose')}
                    className="h-auto p-0 font-medium hover:bg-transparent"
                  >
                    Finalidad
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead className="min-w-[160px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('type')}
                    className="h-auto p-0 font-medium hover:bg-transparent"
                  >
                    Tipo
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead className="min-w-[140px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('origin')}
                    className="h-auto p-0 font-medium hover:bg-transparent"
                  >
                    Origen
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead className="min-w-[120px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('duration')}
                    className="h-auto p-0 font-medium hover:bg-transparent"
                  >
                    Duración
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedCookies.map((cookie, index) => (
                <TableRow key={cookie.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <TableCell className="font-mono text-sm font-medium">
                    {cookie.name}
                  </TableCell>
                  <TableCell className="text-sm">
                    {cookie.purpose}
                  </TableCell>
                  <TableCell>
                    {getCategoryBadge(cookie.category)}
                  </TableCell>
                  <TableCell>
                    {getOriginBadge(cookie.origin)}
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {cookie.duration}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {filteredAndSortedCookies.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium mb-2">No se encontraron cookies</p>
          <p>Intenta ajustar los filtros o el término de búsqueda</p>
        </div>
      )}
    </div>
  );
}