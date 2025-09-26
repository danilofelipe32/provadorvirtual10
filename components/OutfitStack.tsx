/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { OutfitLayer } from '../types';
import { Trash2Icon } from './icons';

interface OutfitStackProps {
  outfitHistory: OutfitLayer[];
  onRemoveLastGarment: () => void;
  onColorSelect: (color: string) => void;
  isLoading: boolean;
}

const COLORS = [
    { name: 'Vermelho', value: '#EF4444' },
    { name: 'Azul Royal', value: '#3B82F6' },
    { name: 'Verde Esmeralda', value: '#10B981' },
    { name: 'Preto', value: '#111827' },
    { name: 'Branco', value: '#F9FAFB' },
    { name: 'Rosa Pink', value: '#EC4899' },
];

const OutfitStack: React.FC<OutfitStackProps> = ({ outfitHistory, onRemoveLastGarment, onColorSelect, isLoading }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-serif tracking-wider text-gray-800 border-b border-gray-400/50 pb-2 mb-3">Itens no Visual</h2>
      <div className="space-y-3">
        {outfitHistory.map((layer, index) => {
          const isLastItem = index === outfitHistory.length - 1;
          return (
            <div key={layer.garment?.id || 'base'}>
              <div
                className="flex items-center justify-between bg-white/50 p-2 rounded-lg animate-fade-in border border-gray-200/80"
              >
                <div className="flex items-center overflow-hidden">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 mr-3 text-xs font-bold text-gray-600 bg-gray-200 rounded-full">
                      {index + 1}
                    </span>
                    {layer.garment && (
                        <img src={layer.garment.url} alt={layer.garment.name} className="flex-shrink-0 w-12 h-12 object-cover rounded-md mr-3" />
                    )}
                    <span className="font-semibold text-gray-800 truncate" title={layer.garment?.name}>
                      {layer.garment ? layer.garment.name : 'Modelo Base'}
                    </span>
                </div>
                {index > 0 && isLastItem && (
                  <button
                    onClick={onRemoveLastGarment}
                    className="flex-shrink-0 text-gray-500 hover:text-red-600 transition-colors p-2 rounded-md hover:bg-red-50"
                    aria-label={`Remover ${layer.garment?.name}`}
                    disabled={isLoading}
                  >
                    <Trash2Icon className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              {isLastItem && layer.garment && (
                <div className="mt-3 pl-9 animate-fade-in">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Mudar Cor</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    {COLORS.map(color => (
                        <button
                            key={color.name}
                            onClick={() => onColorSelect(color.name)}
                            disabled={isLoading}
                            className="w-7 h-7 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-110 active:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            style={{ backgroundColor: color.value }}
                            aria-label={`Mudar cor para ${color.name}`}
                            title={color.name}
                        >
                          <span className="sr-only">{color.name}</span>
                        </button>
                    ))}
                    <div className="relative w-7 h-7">
                        <label
                            htmlFor="custom-color-picker"
                            title="Cor Personalizada"
                            className={`block w-7 h-7 rounded-full border-2 border-white shadow-sm transition-transform flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-110 active:scale-100'}`}
                            style={{ background: 'conic-gradient(from 180deg at 50% 50%, #EF4444, #FBBF24, #10B981, #3B82F6, #A78BFA, #EC4899, #EF4444)' }}
                        >
                        </label>
                        <input
                            type="color"
                            id="custom-color-picker"
                            disabled={isLoading}
                            onChange={(e) => onColorSelect(e.currentTarget.value)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                            aria-label="Selecione uma cor personalizada"
                        />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {outfitHistory.length === 1 && (
            <p className="text-center text-sm text-gray-500 pt-4">Seus itens vestidos aparecerão aqui. Selecione uma peça no guarda-roupa abaixo.</p>
        )}
      </div>
    </div>
  );
};

export default OutfitStack;