import { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Upload, Crop, Check, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AvatarUploaderProps {
  currentAvatar?: string;
  onUpload: (avatarUrl: string) => void;
  onCancel: () => void;
}

export function AvatarUploader({ currentAvatar, onUpload, onCancel }: AvatarUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona una imagen válida');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen debe ser menor a 5MB');
      return;
    }

    setSelectedFile(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would upload to cloud storage
      // For now, we'll use the preview URL
      const mockUploadedUrl = previewUrl || '';
      
      onUpload(mockUploadedUrl);
      toast.success('Foto de perfil actualizada');
    } catch (error) {
      toast.error('Error al subir la imagen');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    onCancel();
  };

  return (
    <Dialog open={true} onOpenChange={handleCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Cambiar foto de perfil</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current/Preview Avatar */}
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="w-32 h-32">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Vista previa" 
                    className="w-full h-full object-cover rounded-full" 
                  />
                ) : currentAvatar ? (
                  <img 
                    src={currentAvatar} 
                    alt="Avatar actual" 
                    className="w-full h-full object-cover rounded-full" 
                  />
                ) : (
                  <AvatarFallback className="bg-brand-primary text-white text-4xl">
                    <Upload className="w-8 h-8" />
                  </AvatarFallback>
                )}
              </Avatar>
              
              {previewUrl && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-semantic-success rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* File Input */}
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            {!selectedFile ? (
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                Seleccionar imagen
              </Button>
            ) : (
              <div className="text-center space-y-2">
                <p className="text-sm text-green-600 flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  Imagen seleccionada: {selectedFile.name}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs"
                >
                  Cambiar imagen
                </Button>
              </div>
            )}

            <div className="text-xs text-gray-500 text-center space-y-1">
              <p>• Formatos soportados: JPG, PNG, GIF</p>
              <p>• Tamaño máximo: 5MB</p>
              <p>• Recomendado: imagen cuadrada</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Subiendo...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Guardar
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}