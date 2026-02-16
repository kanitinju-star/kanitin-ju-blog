import React from 'react';

const StyleGuide = () => {
    const baseColors = [
        { name: 'Brown 600', hex: '#26231E', class: 'bg-brown-600' },
        { name: 'Brown 500', hex: '#43403B', class: 'bg-brown-500' },
        { name: 'Brown 400', hex: '#75716B', class: 'bg-brown-400' },
        { name: 'Brown 300', hex: '#DAD6D1', class: 'bg-brown-300' },
        { name: 'Brown 200', hex: '#EFEEEB', class: 'bg-brown-200' },
        { name: 'Brown 100', hex: '#F9F8F6', class: 'bg-brown-100' },
        { name: 'White', hex: '#FFFFFF', class: 'bg-white border border-gray-200' },
    ];

    const brandColors = [
        { name: 'Orange', hex: '#F2B68C', class: 'bg-brand-orange' },
        { name: 'Green', hex: '#12B279', class: 'bg-brand-green' },
        { name: 'Green', hex: '#D7F2E9', class: 'bg-brand-green-soft' },
        { name: 'Red', hex: '#EB5164', class: 'bg-brand-red' },
    ];

    return (
        <div className="p-12 bg-white min-h-screen font-sans text-brown-600">
            <div className="flex flex-col lg:flex-row gap-20">
                {/* Colors Section */}
                <div className="flex-1">
                    <div className="mb-12">
                        <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Color</p>
                        <h1 className="text-4xl font-semibold mb-8 text-gray-500">Colors</h1>

                        <section className="mb-12">
                            <h2 className="text-xl mb-6 text-gray-400">Base</h2>
                            <div className="flex flex-wrap gap-4">
                                {baseColors.map((color) => (
                                    <div key={color.name + color.hex} className="w-24">
                                        <div className={`w-24 h-16 rounded-lg mb-2 ${color.class}`}></div>
                                        <p className="text-[10px] font-semibold text-gray-600">{color.name}</p>
                                        <p className="text-[10px] text-gray-400">{color.hex}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl mb-6 text-gray-400">Brand</h2>
                            <div className="flex flex-wrap gap-4">
                                {brandColors.map((color) => (
                                    <div key={color.name + color.hex} className="w-24">
                                        <div className={`w-24 h-16 rounded-lg mb-2 ${color.class}`}></div>
                                        <p className="text-[10px] font-semibold text-gray-600">{color.name}</p>
                                        <p className="text-[10px] text-gray-400">{color.hex}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Fonts Section */}
                <div className="flex-1 border-l pl-20 border-gray-100">
                    <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Font</p>
                    <h1 className="text-4xl font-semibold mb-12 text-gray-500">Fonts</h1>

                    <div className="space-y-8">
                        <div>
                            <h1 className="text-headline-1">Headline 1</h1>
                        </div>
                        <div>
                            <h2 className="text-headline-2">Headline 2</h2>
                        </div>
                        <div>
                            <h3 className="text-headline-3">Headline 3</h3>
                        </div>
                        <div>
                            <h4 className="text-headline-4">Headline 4</h4>
                        </div>
                        <div>
                            <p className="text-body-1">Body 1</p>
                        </div>
                        <div>
                            <p className="text-body-2">Body 2</p>
                        </div>
                        <div>
                            <p className="text-body-3">Body 2</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StyleGuide;
