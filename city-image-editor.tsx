import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Upload, 
  X, 
  Save, 
  Eye, 
  Search,
  RefreshCw,
  ImageIcon,
  ExternalLink
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

interface CityImageEditorProps {
  city: {
    name: string;
    image: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSave: (cityName: string, newImageUrl: string) => void;
}

export function CityImageEditor({ city, isOpen, onClose, onSave }: CityImageEditorProps) {
  const [newImageUrl, setNewImageUrl] = useState(city.image);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  // Predefined city image suggestions
  const getSuggestedImages = (cityName: string) => {
    const imageLibrary: { [key: string]: string[] } = {
      'Alicante': [
        'https://images.unsplash.com/photo-1544963950-2023b25de3d9?w=500&q=80', // Castillo de Santa Bárbara
        'https://images.unsplash.com/photo-1590725140246-20acdee442be?w=500&q=80', // Puerto deportivo
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80', // Playa del Postiguet
        'https://images.unsplash.com/photo-1519640244749-31b4ab1c3a5b?w=500&q=80', // Centro histórico
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80'  // Explanada
      ],
      'Elche': [
        'https://images.unsplash.com/photo-1587217820888-7ebb3a5b5600?w=500&q=80', // Palmeral
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&q=80', // Palmas
        'https://images.unsplash.com/photo-1544068751-9ad0b79ad48e?w=500&q=80', // Centro
        'https://images.unsplash.com/photo-1562503542-2a1e6f03b16e?w=500&q=80', // Parque Municipal
        'https://images.unsplash.com/photo-1590587267084-d7b4a3549d17?w=500&q=80'  // Jardín Huerto del Cura
      ],
      'Madrid': [
        'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&q=80', // Gran Vía
        'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=500&q=80', // Palacio Real
        'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&q=80', // Puerta del Sol
        'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=500&q=80', // Retiro
        'https://images.unsplash.com/photo-1512187377773-f3f6e1e16e87?w=500&q=80'  // Skyline
      ],
      'Barcelona': [
        'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=500&q=80', // Sagrada Familia
        'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=500&q=80', // Park Güell
        'https://images.unsplash.com/photo-1544068751-9ad0b79ad48e?w=500&q=80', // Gothic Quarter
        'https://images.unsplash.com/photo-1579282240050-352db0a14c21?w=500&q=80', // Casa Batlló
        'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500&q=80'  // Beach
      ],
      'Valencia': [
        'https://images.unsplash.com/photo-1544068751-9ad0b79ad48e?w=500&q=80', // City of Arts
        'https://images.unsplash.com/photo-1562503542-2a1e6f03b16e?w=500&q=80', // Central Market
        'https://images.unsplash.com/photo-1590587267084-d7b4a3549d17?w=500&q=80', // Beach
        'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=500&q=80', // Cathedral
        'https://images.unsplash.com/photo-1561030173-97a3ed65b2b5?w=500&q=80'  // Malvarossa
      ],
      'Sevilla': [
        'https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=500&q=80', // Cathedral
        'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=500&q=80', // Alcazar
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&q=80', // Plaza de España
        'https://images.unsplash.com/photo-1545158370-8c7e8a0e9c59?w=500&q=80', // Giralda
        'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&q=80'  // Triana
      ],
      'Bilbao': [
        'https://images.unsplash.com/photo-1544963950-2023b25de3d9?w=500&q=80', // Guggenheim
        'https://images.unsplash.com/photo-1593963275817-e96bf12f4de1?w=500&q=80', // Casco Viejo
        'https://images.unsplash.com/photo-1596736020632-8bb3bc6ec0b7?w=500&q=80', // River
        'https://images.unsplash.com/photo-1590436304826-84ced427a31a?w=500&q=80', // Puppy
        'https://images.unsplash.com/photo-1544963950-2023b25de3d9?w=500&q=80'  // Modern Architecture
      ],
      'Zaragoza': [
        'https://images.unsplash.com/photo-1587217820888-7ebb3a5b5600?w=500&q=80', // Basilica del Pilar
        'https://images.unsplash.com/photo-1592550052049-a85e4ecc3e58?w=500&q=80', // Aljafería
        'https://images.unsplash.com/photo-1544012349-b65d5c9beb21?w=500&q=80', // Stone Bridge
        'https://images.unsplash.com/photo-1592550052049-a85e4ecc3e58?w=500&q=80', // Cathedral
        'https://images.unsplash.com/photo-1587217820888-7ebb3a5b5600?w=500&q=80'  // Ebro River
      ]
    };
    return imageLibrary[cityName] || [];
  };

  const suggestedImages = getSuggestedImages(city.name);

  const handleImageLoad = () => {
    setIsPreviewLoading(false);
    setPreviewError(false);
  };

  const handleImageError = () => {
    setIsPreviewLoading(false);
    setPreviewError(true);
  };

  const handleUrlChange = (url: string) => {
    setNewImageUrl(url);
    setIsPreviewLoading(true);
    setPreviewError(false);
  };

  const handleSave = () => {
    if (!newImageUrl) {
      toast.error('Por favor, introduce una URL de imagen');
      return;
    }

    if (previewError) {
      toast.error('La imagen no se puede cargar. Verifica la URL');
      return;
    }

    onSave(city.name, newImageUrl);
    toast.success(`Imagen de ${city.name} actualizada correctamente`);
    onClose();
  };

  const handleSuggestionClick = (imageUrl: string) => {
    handleUrlChange(imageUrl);
  };

  const generateUnsplashSearch = () => {
    const searchTerm = `${city.name} city architecture landmark`;
    const unsplashUrl = `https://unsplash.com/s/photos/${encodeURIComponent(searchTerm)}`;
    window.open(unsplashUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-brand-primary" />
              </div>
              <DialogTitle className="font-poppins text-xl font-semibold text-gray-900">
                Editar imagen de {city.name}
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="w-8 h-8 p-0"
              aria-label="Cerrar editor"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Preview actual */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Vista previa actual
            </Label>
            <Card className="overflow-hidden">
              <div className="relative h-48">
                <ImageWithFallback
                  src={newImageUrl}
                  alt={`Vista previa de ${city.name}`}
                  className="w-full h-full object-cover"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  width={500}
                  height={200}
                />
                {isPreviewLoading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 text-brand-primary animate-spin" />
                  </div>
                )}
                {previewError && (
                  <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-gray-500">
                    <ImageIcon className="w-12 h-12 mb-2" />
                    <p className="text-sm">Error al cargar la imagen</p>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-900 border border-gray-200">
                    {city.name}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* URL Input */}
          <div className="space-y-3">
            <Label htmlFor="image-url" className="text-sm font-medium text-gray-700">
              URL de la imagen
            </Label>
            <div className="flex gap-2">
              <Input
                id="image-url"
                type="url"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={newImageUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={generateUnsplashSearch}
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Unsplash
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Introduce la URL de una imagen. Recomendamos usar imágenes de alta calidad (mínimo 500x300px).
            </p>
          </div>

          {/* Suggested Images */}
          {suggestedImages.length > 0 && (
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Imágenes sugeridas para {city.name}
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {suggestedImages.map((imageUrl, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      newImageUrl === imageUrl ? 'ring-2 ring-brand-primary' : ''
                    }`}
                    onClick={() => handleSuggestionClick(imageUrl)}
                  >
                    <div className="relative h-24 overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={imageUrl}
                        alt={`Opción ${index + 1} para ${city.name}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                        width={200}
                        height={100}
                      />
                      {newImageUrl === imageUrl && (
                        <div className="absolute inset-0 bg-brand-primary/20 flex items-center justify-center">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Haz clic en cualquier imagen para seleccionarla
              </p>
            </div>
          )}

          {/* Tips */}
          <Card className="bg-blue-50 border border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <ImageIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">
                    Consejos para mejores imágenes
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Usa imágenes horizontales con ratio 16:9 o 3:2</li>
                    <li>• Resolución mínima recomendada: 800x450px</li>
                    <li>• Evita imágenes con texto o watermarks</li>
                    <li>• Asegúrate de tener derechos para usar la imagen</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              disabled={previewError || isPreviewLoading}
              className="flex-1 bg-brand-primary hover:bg-blue-600 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar cambios
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}