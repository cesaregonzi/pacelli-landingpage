'use client';

import { AddToCartButton, Image, ProductPrice, ProductProvider, useCart } from '@shopify/hydrogen-react';

import { Button } from '~/components/snippets';
import { Product } from '@shopify/hydrogen-react/storefront-api-types';
import clsx from 'clsx';
// import Image from 'next/image';
// import { Product } from 'graphql/graphql';
import { useVariantSelector } from 'hooks/useVariantSelector';

export function ProductSingleSection({ product }: { product: Product }) {
  const { variantId, options, selectOption } = useVariantSelector(product);

  return (
    <ProductProvider data={product}>
      <section className="base-container">
        <div className="flex flex-col rounded-lg shadow-sm md:flex-row md:space-x-8">
          <div className="md:basis-6/12 ">
            <div className="h-full w-full overflow-hidden rounded-lg bg-gray-200">
              <Image
                src={product.images?.nodes[0].url}
                alt={product.images?.nodes[0].altText || ''}
                width={product.images?.nodes[0].width || 300}
                height={product.images?.nodes[0].height || 300}
                className="min-h-[600px] w-full object-cover object-center"
              />
            </div>
          </div>

          <div className="md:basis-6/12">
            <div className="mt-4 pt-5 md:pt-10">
              <h2 className="sr-only">Product information</h2>

              <h1 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>

              <p className="mb-5 text-base text-gray-900">{product.description}</p>

              <div className="mb-5 text-3xl tracking-tight text-gray-900">
                <ProductPrice data={product}></ProductPrice>
              </div>

              <div className="mb-2">
                {options?.map(({ name, values }) => (
                  <div className="mb-3" key={name}>
                    <div className="flex items-center justify-between">
                      <h3 className="mb-1 text-lg font-medium text-gray-900">{name}</h3>
                    </div>

                    {values?.map(({ value, selected, disabled }) => {
                      return (
                        <Button
                          className="mr-1"
                          color={selected ? 'primary' : 'dark'}
                          size="sm"
                          key={value}
                          disabled={disabled}
                          onClick={() => {
                            console.log('selectOption');
                            selectOption(name, value);
                          }}
                        >
                          {value}
                        </Button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <AddToCartButton
                variantId={variantId}
                className={clsx(
                  'mt-10 flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent bg-primary-600 p-3 text-base font-semibold text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-gray-700',
                  variantId ? '' : 'opacity-50 pointer-events-none'
                )}
              >
                Add to Cart
              </AddToCartButton>
            </div>
          </div>
        </div>
      </section>
    </ProductProvider>
  );
}
