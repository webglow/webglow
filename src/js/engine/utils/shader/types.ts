export interface IShaderParam {
	displayName: string;
	key: string;
	type: UniformType;
	defaultValue: any;
}

export interface IShaderJSON {
	id: string;
	displayName: string;
	params: IShaderParam[];
	vertex: string;
	fragment: string;
}

export enum UniformType {
	t_bool = 't_bool',
	t_float = 't_float',
	t_vec3 = 't_vec3',
	t_color = 't_color',
	t_mat3 = 't_mat3',
	t_mat4 = 't_mat4',
	t_int = 't_int',
	t_uint = 't_uint',
}
