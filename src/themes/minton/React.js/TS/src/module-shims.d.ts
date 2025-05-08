// types/module-shims.d.ts
declare module '@hookform/resolvers/yup' {
    import { Resolver } from 'react-hook-form';
    import * as Yup from 'yup';

    export function yupResolver<T extends Yup.AnyObjectSchema>(
        schema: T
    ): Resolver<Yup.InferType<T>>;
}
